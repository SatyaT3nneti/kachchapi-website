const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Curriculum data extracted from SinglePageLayout.tsx
const curriculumData = {
  beginner: {
    categories: [
      {
        id: 'ai-ml',
        title: 'AI/ML',
        courses: [
          { id: 1, title: 'Python', duration: '3 Months' },
          { id: 2, title: 'Introduction to Machine Learning', duration: '3 Months' },
          { id: 3, title: 'Deep Learning', duration: '2.5 Months' }
        ]
      },
      {
        id: 'iot',
        title: 'IoT',
        courses: [
          { id: 4, title: 'IoT Fundamentals', duration: '3 Months' },
          { id: 5, title: 'Embedded Systems Programming', duration: '2.5 Months' }
        ]
      },
      {
        id: 'cybersecurity',
        title: 'Cybersecurity',
        courses: [
          { id: 6, title: 'Cybersecurity Fundamentals', duration: '3 Months' },
          { id: 7, title: 'Network Security', duration: '2.5 Months' }
        ]
      },
      {
        id: 'web-mobile',
        title: 'Web and Mobile Development',
        courses: [
          { id: 8, title: 'Frontend Development', duration: '3 Months' },
          { id: 9, title: 'Backend Development', duration: '3 Months' },
          { id: 10, title: 'Mobile App Development', duration: '2.5 Months' }
        ]
      },
      {
        id: 'data-engineering',
        title: 'Data Engineering',
        courses: [
          { id: 11, title: 'Data Engineering Fundamentals', duration: '3 Months' },
          { id: 12, title: 'Big Data Basics', duration: '2.5 Months' }
        ]
      }
    ]
  },
  intermediate: {
    categories: [
      {
        id: 'ai-ml',
        title: 'AI/ML',
        courses: [
          { id: 11, title: 'Python', duration: '3 Months' },
          { id: 12, title: 'Advanced Machine Learning', duration: '3 Months' },
          { id: 13, title: 'Deep Learning', duration: '2.5 Months' },
          { id: 14, title: 'LLMs', duration: '3 Months' }
        ]
      },
      {
        id: 'iot',
        title: 'IoT',
        courses: [
          { id: 14, title: 'Advanced IoT Development', duration: '3 Months' },
          { id: 15, title: 'IoT Protocols & Standards', duration: '2.5 Months' }
        ]
      },
      {
        id: 'cybersecurity',
        title: 'Cybersecurity',
        courses: [
          { id: 16, title: 'Penetration Testing', duration: '3 Months' },
          { id: 17, title: 'Secure Coding Practices', duration: '2.5 Months' }
        ]
      },
      {
        id: 'web-mobile',
        title: 'Web and Mobile Development',
        courses: [
          { id: 18, title: 'Full-Stack Development', duration: '3 Months' },
          { id: 19, title: 'Backend Development', duration: '3 Months' },
          { id: 20, title: 'Advanced Mobile Development', duration: '2.5 Months' }
        ]
      },
      {
        id: 'data-engineering',
        title: 'Data Engineering',
        courses: [
          { id: 21, title: 'Data Pipeline Development', duration: '3 Months' },
          { id: 22, title: 'Streaming Data Processing', duration: '2.5 Months' }
        ]
      }
    ]
  },
  advanced: {
    categories: [
      {
        id: 'ai-ml',
        title: 'AI/ML',
        courses: [
          { id: 21, title: 'Python', duration: '3 Months' },
          { id: 22, title: 'Deep Learning', duration: '3 Months' },
          { id: 24, title: 'LLMs', duration: '3 Months' },
          { id: 23, title: 'AI Production Systems', duration: '2.5 Months' }
        ]
      },
      {
        id: 'iot',
        title: 'IoT',
        courses: [
          { id: 24, title: 'IoT Architecture & Design', duration: '3 Months' },
          { id: 25, title: 'IoT Project Implementation', duration: '2.5 Months' }
        ]
      },
      {
        id: 'cybersecurity',
        title: 'Cybersecurity',
        courses: [
          { id: 26, title: 'Advanced Security Operations', duration: '3 Months' },
          { id: 27, title: 'Security Architecture', duration: '2.5 Months' }
        ]
      },
      {
        id: 'web-mobile',
        title: 'Web and Mobile Development',
        courses: [
          { id: 28, title: 'Enterprise Web Applications', duration: '3 Months' },
          { id: 29, title: 'Backend Development', duration: '3 Months' },
          { id: 30, title: 'Native Mobile Development', duration: '2.5 Months' }
        ]
      },
      {
        id: 'data-engineering',
        title: 'Data Engineering',
        courses: [
          { id: 31, title: 'Advanced Data Engineering', duration: '3 Months' },
          { id: 32, title: 'Real-Time Data Systems', duration: '2.5 Months' }
        ]
      }
    ]
  }
};

// Get all unique categories
const getAllCategories = () => {
  const categoryMap = new Map();
  Object.values(curriculumData).forEach(level => {
    level.categories.forEach(cat => {
      if (!categoryMap.has(cat.id)) {
        categoryMap.set(cat.id, cat.title);
      }
    });
  });
  return Array.from(categoryMap.entries()).map(([id, title]) => ({ id, title }));
};

const categories = getAllCategories();
const levels = ['Beginner', 'Intermediate', 'Advanced'];

function generatePDF() {
  // Create output directory if it doesn't exist
  const outputDir = path.join(__dirname, '..', 'public', 'resources');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'Kachchapi_Course_Matrix.pdf');
  const doc = new PDFDocument({ 
    size: 'A4',
    layout: 'landscape',
    margins: { top: 50, bottom: 60, left: 50, right: 50 }
  });

  // Pipe PDF to file
  doc.pipe(fs.createWriteStream(outputPath));

  // Helper function to draw cell
  function drawCell(x, y, width, height, text, options = {}) {
    const { bold = false, fill = false, fillColor = '#ffffff', textColor = '#1e293b', fontSize = 9 } = options;
    
    if (fill) {
      doc.rect(x, y, width, height)
         .fillColor(fillColor)
         .fill();
    }
    
    doc.rect(x, y, width, height)
       .strokeColor('#e2e8f0')
       .lineWidth(0.5)
       .stroke();
    
    doc.fillColor(textColor)
       .fontSize(fontSize)
       .font(bold ? 'Helvetica-Bold' : 'Helvetica');
    
    // Handle multi-line text with proper wrapping
    const textWidth = width - 20;
    const textX = x + 10;
    const textY = y + 10;
    
    // Split text by newlines first
    const lines = text.split('\n');
    let currentY = textY;
    const lineHeight = fontSize * 1.2;
    
    lines.forEach((line) => {
      if (currentY + lineHeight > y + height - 10) {
        return; // Don't draw if it exceeds cell height
      }
      
      // PDFKit's text method handles wrapping automatically
      doc.text(line, textX, currentY, {
        width: textWidth,
        align: 'left',
        ellipsis: false
      });
      
      // Move to next line
      currentY += lineHeight;
    });
    
    return height;
  }

  // Generate one page per category
  categories.forEach((category, categoryIndex) => {
    // Add new page for each category (except first)
    if (categoryIndex > 0) {
      doc.addPage();
    }

    // Header
    doc.fontSize(28)
       .fillColor('#1e293b')
       .font('Helvetica-Bold')
       .text('KACHCHAPI', { align: 'center' });

    doc.moveDown(0.8);
    
    // Category title
    doc.fontSize(20)
       .fillColor('#334155')
       .font('Helvetica-Bold')
       .text(category.title, { align: 'center' });

    doc.moveDown(1.5);

    // Table setup
    const tableTop = doc.y;
    const cellPadding = 10;
    const rowHeight = 30;
    const courseColWidth = 300;
    const levelColWidth = (692 - courseColWidth) / 3; // Remaining width divided by 3 levels

    // Get all unique courses for this category across all levels
    const allCourses = new Map();
    levels.forEach(level => {
      const levelKey = level.toLowerCase();
      const categoryData = curriculumData[levelKey]?.categories.find(c => c.id === category.id);
      if (categoryData && categoryData.courses.length > 0) {
        categoryData.courses.forEach(course => {
          const courseKey = course.title.toLowerCase();
          if (!allCourses.has(courseKey)) {
            allCourses.set(courseKey, {
              title: course.title,
              levels: {}
            });
          }
          allCourses.get(courseKey).levels[levelKey] = course.duration;
        });
      }
    });

    const courseList = Array.from(allCourses.values());

    // Header row
    let currentY = tableTop;
    
    // Course header
    drawCell(50, currentY, courseColWidth, rowHeight * 1.3, 'COURSE', {
      bold: true,
      fill: true,
      fillColor: '#1e293b',
      textColor: '#ffffff',
      fontSize: 12
    });
    
    // Level headers
    levels.forEach((level, index) => {
      const x = 50 + courseColWidth + (index * levelColWidth);
      drawCell(x, currentY, levelColWidth, rowHeight * 1.3, level.toUpperCase(), {
        bold: true,
        fill: true,
        fillColor: '#334155',
        textColor: '#ffffff',
        fontSize: 12
      });
    });

    currentY += rowHeight * 1.3;

    // Data rows - one row per course
    courseList.forEach((course, courseIndex) => {
      // Get duration for each level
      const beginnerDuration = course.levels.beginner || '—';
      const intermediateDuration = course.levels.intermediate || '—';
      const advancedDuration = course.levels.advanced || '—';

      // Calculate row height (fixed for consistency)
      const dynamicRowHeight = rowHeight;

      // Course name cell
      drawCell(50, currentY, courseColWidth, dynamicRowHeight, course.title, {
        bold: true,
        fill: true,
        fillColor: courseIndex % 2 === 0 ? '#f8fafc' : '#ffffff',
        fontSize: 10
      });

      // Level cells with durations
      const durations = [beginnerDuration, intermediateDuration, advancedDuration];
      durations.forEach((duration, levelIndex) => {
        const x = 50 + courseColWidth + (levelIndex * levelColWidth);
        drawCell(x, currentY, levelColWidth, dynamicRowHeight, duration, {
          fill: true,
          fillColor: courseIndex % 2 === 0 ? '#f8fafc' : '#ffffff',
          fontSize: 9
        });
      });

      currentY += dynamicRowHeight;
    });

    // Footer with copyright on bottom left
    const pageHeight = doc.page.height;
    const footerY = pageHeight - 40;
    
    doc.fontSize(8)
       .fillColor('#94a3b8')
       .font('Helvetica')
       .text('© Kachchapi Technologies. All rights reserved.', 50, footerY);
  });

  // Finalize PDF
  doc.end();

  console.log(`✅ PDF generated successfully at: ${outputPath}`);
  return outputPath;
}

// Run if called directly
if (require.main === module) {
  generatePDF();
}

module.exports = { generatePDF };
