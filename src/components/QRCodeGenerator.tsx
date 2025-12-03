import React, { useState, useRef, useEffect } from 'react';
import { generateQRCodeWithLogo, downloadQRCode, generateQRCodeFilename } from '../utils/qrCodeUtils';

interface QRCodeGeneratorProps {
  url: string;
  leaderName: string;
  size?: number;
  className?: string;
  showDownloadButton?: boolean;
  showLabel?: boolean;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ 
  url, 
  leaderName, 
  size = 200, 
  className = '',
  showDownloadButton = true,
  showLabel = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    generateQRCode();
  }, [url, size]);

  const generateQRCode = async () => {
    if (!canvasRef.current) return;

    try {
      setIsGenerating(true);
      setError(null);

      // Generate QR code with logo using utility function
      const qrCodeDataURL = await generateQRCodeWithLogo(url, {
        size,
        logoUrl: '/logo.svg',
        color: {
          dark: '#1f2937', // dark-800
          light: '#ffffff'
        }
      });

      // Create canvas context and draw the QR code
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = size;
      canvas.height = size;

      const qrImage = new Image();
      qrImage.onload = () => {
        ctx.drawImage(qrImage, 0, 0, size, size);
      };
      qrImage.src = qrCodeDataURL;
    } catch (err) {
      setError('Failed to generate QR code');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;

    const dataURL = canvasRef.current.toDataURL();
    const filename = generateQRCodeFilename(leaderName);
    downloadQRCode(dataURL, filename);
  };

  if (error) {
    return (
      <div className={`text-center p-4 ${className}`}>
        <div className="text-red-500 text-sm mb-2">Error: {error}</div>
        <button 
          onClick={generateQRCode}
          className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`}>
      <div className="mb-4">
        <canvas
          ref={canvasRef}
          className="border border-gray-200 rounded-lg shadow-sm mx-auto"
          style={{ display: isGenerating ? 'none' : 'block' }}
        />
        {isGenerating && (
          <div className="flex items-center justify-center" style={{ width: size, height: size }}>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        )}
      </div>
      
      {(showLabel || showDownloadButton) && (
        <div className="space-y-2">
          {showLabel && (
            <p className="text-sm text-gray-600">
              Scan to view {leaderName}'s profile
            </p>
          )}
          {showDownloadButton && (
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              Download QR Code
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
