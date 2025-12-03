# QR Code Generator Feature

## Overview
This feature adds QR code generation functionality to the Kachchapi website, allowing users to generate QR codes for leader profile URLs with the Kachchapi logo embedded in the center.

## Features
- **QR Code Generation**: Generate QR codes for any URL
- **Logo Integration**: Automatically embed the Kachchapi logo in the center of QR codes
- **Photo Overlay**: QR codes displayed as elegant overlays on leader photographs
- **Download Functionality**: Users can download QR codes as PNG files
- **Responsive Design**: QR codes scale appropriately for different screen sizes
- **Interactive Tooltips**: Hover effects with helpful tooltips
- **Error Handling**: Graceful fallback if logo fails to load

## Components

### QRCodeGenerator Component
Located at `src/components/QRCodeGenerator.tsx`

**Props:**
- `url: string` - The URL to encode in the QR code
- `leaderName: string` - Name of the leader (used for filename generation)
- `size?: number` - Size of the QR code in pixels (default: 200)
- `className?: string` - Additional CSS classes
- `showDownloadButton?: boolean` - Show/hide download button (default: true)
- `showLabel?: boolean` - Show/hide descriptive label (default: true)

**Features:**
- High error correction level for logo overlay
- Circular white background for logo
- Loading state with spinner
- Error state with retry button
- Download functionality

### Utility Functions
Located at `src/utils/qrCodeUtils.ts`

**Functions:**
- `generateQRCodeDataURL()` - Generate basic QR code
- `generateQRCodeWithLogo()` - Generate QR code with logo overlay
- `downloadQRCode()` - Download QR code as file
- `generateQRCodeFilename()` - Generate filename for downloads

## Usage

### In Leader Detail Page (Photo Overlay)
```tsx
<div className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group">
  <QRCodeGenerator
    url={`${window.location.origin}/leader-detail-${leader.id}`}
    leaderName={leader.name}
    size={80}
    showDownloadButton={false}
    showLabel={false}
  />
  <div className="absolute bottom-full right-0 mb-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
    Scan to share profile
  </div>
</div>
```

### In Resources Page (Card QR Code)
```tsx
<QRCodeGenerator
  url={`${window.location.origin}/leader-detail-${leader.id}`}
  leaderName={leader.name}
  size={100}
  className="inline-block"
  showLabel={false}
/>
```

## Dependencies
- `qrcode` - QR code generation library
- `@types/qrcode` - TypeScript definitions

## Installation
```bash
npm install qrcode @types/qrcode
```

## Customization

### Logo
The QR code generator looks for the logo at `/logo.svg` by default. To use a different logo:
1. Place your logo file in the `public` folder
2. Update the `logoUrl` prop in the `generateQRCodeWithLogo` function

### Colors
Default colors can be customized in the `QRCodeGenerator` component:
```tsx
color: {
  dark: '#1f2937', // QR code color
  light: '#ffffff' // Background color
}
```

### Size
The logo size is automatically calculated as 20% of the QR code size. This can be customized by passing a `logoSize` option to `generateQRCodeWithLogo`.

## Error Handling
- If the logo fails to load, a simple "K" placeholder is drawn
- If QR code generation fails, an error message is displayed with a retry button
- All errors are logged to the console for debugging

## Browser Support
- Modern browsers with Canvas API support
- Mobile responsive design
- Touch-friendly download buttons
