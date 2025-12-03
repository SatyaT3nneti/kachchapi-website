import QRCode from 'qrcode';

export interface QRCodeOptions {
  size?: number;
  margin?: number;
  color?: {
    dark: string;
    light: string;
  };
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
}

export interface QRCodeWithLogoOptions extends QRCodeOptions {
  logoUrl?: string;
  logoSize?: number;
}

/**
 * Generate a QR code data URL
 */
export const generateQRCodeDataURL = async (
  text: string, 
  options: QRCodeOptions = {}
): Promise<string> => {
  const defaultOptions = {
    width: 200,
    margin: 2,
    color: {
      dark: '#1f2937',
      light: '#ffffff'
    },
    errorCorrectionLevel: 'M' as const,
    ...options
  };

  return await QRCode.toDataURL(text, defaultOptions);
};

/**
 * Generate a QR code with logo overlay
 */
export const generateQRCodeWithLogo = async (
  text: string,
  options: QRCodeWithLogoOptions = {}
): Promise<string> => {
  const {
    logoUrl = '/logo.svg',
    logoSize,
    size = 200,
    ...qrOptions
  } = options;

  // Generate QR code with high error correction for logo overlay
  const qrDataURL = await generateQRCodeDataURL(text, {
    ...qrOptions,
    size,
    errorCorrectionLevel: 'H'
  });

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    canvas.width = size;
    canvas.height = size;

    const qrImage = new Image();
    qrImage.onload = () => {
      // Draw QR code
      ctx.drawImage(qrImage, 0, 0, size, size);

      // Load and draw logo
      const logo = new Image();
      logo.onload = () => {
        const logoSizePx = logoSize || Math.floor(size * 0.2);
        const logoX = (size - logoSizePx) / 2;
        const logoY = (size - logoSizePx) / 2;

        // Create circular background for logo
        ctx.save();
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, logoSizePx / 2 + 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.restore();

        // Draw logo
        ctx.drawImage(logo, logoX, logoY, logoSizePx, logoSizePx);
        
        resolve(canvas.toDataURL());
      };

      logo.onerror = () => {
        // If logo fails to load, draw a simple text placeholder
        const logoSizePx = logoSize || Math.floor(size * 0.2);
        const logoX = (size - logoSizePx) / 2;
        const logoY = (size - logoSizePx) / 2;

        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(logoX - 2, logoY - 2, logoSizePx + 4, logoSizePx + 4);
        
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('K', size / 2, size / 2 + 4);
        ctx.restore();

        resolve(canvas.toDataURL());
      };

      logo.src = logoUrl;
    };

    qrImage.onerror = () => {
      reject(new Error('Failed to load QR code image'));
    };

    qrImage.src = qrDataURL;
  });
};

/**
 * Download QR code as PNG file
 */
export const downloadQRCode = (dataURL: string, filename: string) => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataURL;
  link.click();
};

/**
 * Generate filename for QR code based on leader name
 */
export const generateQRCodeFilename = (leaderName: string): string => {
  return `qr-code-${leaderName.replace(/\s+/g, '-').toLowerCase()}.png`;
};
