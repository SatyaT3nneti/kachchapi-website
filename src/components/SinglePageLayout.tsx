import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faUserTie, faRoute, faUsers, faGraduationCap, faBuilding } from '@fortawesome/free-solid-svg-icons';
import LiveDemoModal from './LiveDemoModal';
import HeaderSinglePage from './HeaderSinglePage';
import Footer from './Footer';
import { sendDemoSessionEmail } from '../services/emailService';

const SinglePageLayout: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [expandedCourses, setExpandedCourses] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91'
  });
  const [isSubmittingDemo, setIsSubmittingDemo] = useState(false);
  const [demoSubmitStatus, setDemoSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle demo session form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmittingDemo(true);
    setDemoSubmitStatus({ type: null, message: '' });
    
    try {
      const result = await sendDemoSessionEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        countryCode: formData.countryCode,
      });
      
      if (result.success) {
        setDemoSubmitStatus({
          type: 'success',
          message: 'Thank you! We have received your request for a free live demo session. We will contact you within 24-48 hours to schedule your session.'
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          countryCode: '+91'
        });
      } else {
        setDemoSubmitStatus({
          type: 'error',
          message: result.message || 'Failed to submit your request. Please try again or contact us directly.'
        });
      }
    } catch (error) {
      console.error('Error submitting demo session form:', error);
      setDemoSubmitStatus({
        type: 'error',
        message: 'An error occurred while submitting your request. Please try again or contact us directly.'
      });
    } finally {
      setIsSubmittingDemo(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const features = [
    {
      icon: faLaptopCode,
      title: 'AI & ML Project-Based Training',
      description: 'Hands-on learning with real-world AI and machine learning projects. Master industry-ready skills through practical software development training and Gen AI applications.'
    },
    {
      icon: faUserTie,
      title: 'Tech Interview Preparation',
      description: 'Comprehensive interview coaching for AI and software engineering roles. Practice coding challenges, system design, and technical assessments to land your dream job.'
    },
    {
      icon: faRoute,
      title: 'Career Guidance for Tech Professionals',
      description: 'Personalized career counseling and roadmap development for AI and software development careers. Get expert guidance to achieve your professional goals in tech.'
    },
    {
      icon: faUsers,
      title: 'Leadership Coaching for Tech Leaders',
      description: 'Develop leadership skills, team management, and communication abilities for career advancement in AI and software development organizations.'
    },
    {
      icon: faGraduationCap,
      title: 'Academic Project Mentorship in AI/ML',
      description: 'Expert guidance and mentorship for academic projects in artificial intelligence, machine learning, and software development. Research work and thesis development support.'
    },
    {
      icon: faBuilding,
      title: 'Corporate AI Skills Training',
      description: 'Comprehensive technical training programs for corporate teams. Enhance AI skills, machine learning expertise, and software development capabilities to boost productivity.'
    }
  ];

  const programs = [
    {
      title: 'AI & Machine Learning Project-Based Training',
      description: 'Hands-on project-based learning in AI/ML, Gen AI, software development, web development, and mobile development. Build industry-ready skills through real-world projects.',
      duration: '3-12 months',
      level: 'All Levels'
    },
    {
      title: 'Tech Interview Preparation for AI & Software Roles',
      description: 'Comprehensive interview coaching for AI, machine learning, and software engineering positions. Technical assessments, coding practice, system design, and mock interviews.',
      duration: '2-6 months',
      level: 'All Levels'
    },
    {
      title: 'Career Guidance for AI & Tech Professionals',
      description: 'Personalized career counseling and roadmap development for AI, machine learning, and software development careers. Professional goal setting and industry insights.',
      duration: 'Ongoing',
      level: 'All Levels'
    },
    {
      title: 'Leadership Coaching for Tech Leaders',
      description: 'Develop essential leadership skills, team management, and communication abilities for tech leadership roles in AI and software development organizations.',
      duration: '3-6 months',
      level: 'Intermediate to Advanced'
    },
    {
      title: 'Academic Project Mentorship',
      description: 'Expert guidance and mentorship for academic projects, research work, and thesis development',
      duration: '3-12 months',
      level: 'All Levels'
    },
    {
      title: 'Corporate Training',
      description: 'Comprehensive technical training programs for corporate teams to enhance skills and productivity',
      duration: 'Flexible',
      level: 'All Levels'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Student, B.Tech CSE',
      content: 'The Innovation Hub program transformed my understanding of AI. Working on real projects with industry mentors was invaluable.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Student, MCA',
      content: 'Kachchapi\'s VR Academy made learning complex concepts so much easier. The immersive experience is unmatched.',
      rating: 5
    },
    {
      name: 'Amit Patel',
      role: 'Software Engineer',
      content: 'The mentorship I received helped me land my dream job. The practical approach to learning is what sets Kachchapi apart.',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'What is Kachchapi?',
      answer: 'Kachchapi is an innovative technology-based startup company dedicated to empowering the next generation with comprehensive learning solutions. We cater to both academia and public learners, offering a unique blend of "learn by experience" and "learn from experienced" methodologies.'
    },
    {
      question: 'Who can join the programs?',
      answer: 'Our programs are designed for students, professionals, and institutions. We offer programs for all skill levels from beginners to advanced learners.'
    },
    {
      question: 'What makes Kachchapi different?',
      answer: 'We focus on "Learn by Experience, Learn from Experienced" - providing real-world projects, industry mentorship, and immersive learning experiences.'
    },
    {
      question: 'How do I get started?',
      answer: 'Book a free live demo with our advisor to get a personalized career roadmap and learn more about our programs.'
    }
  ];

  // Curriculum data structure by category
  const curriculumData = {
    beginner: {
      duration: '11.5 Months',
      categories: [
        {
          id: 'ai-ml',
          title: 'AI/ML',
          courses: [
            {
              id: 1,
              title: 'Introduction to Machine Learning',
              duration: '3 Months',
              description: 'Learn the fundamentals of machine learning, data preprocessing, and basic algorithms.',
              topics: [
                'Introduction to ML', 'Data Preprocessing', 'Linear Regression', 'Logistic Regression',
                'Decision Trees', 'Random Forest', 'K-Means Clustering', 'Model Evaluation',
                'Cross-Validation', 'Feature Engineering', 'Python for ML', 'NumPy & Pandas'
              ]
            },
            {
              id: 2,
              title: 'Deep Learning Basics',
              duration: '2.5 Months',
              description: 'Introduction to neural networks, backpropagation, and basic deep learning concepts.',
              topics: [
                'Neural Networks Basics', 'Activation Functions', 'Backpropagation', 'Gradient Descent',
                'TensorFlow/Keras', 'Convolutional Neural Networks (CNN)', 'Recurrent Neural Networks (RNN)',
                'Overfitting & Regularization'
              ]
            }
          ]
        },
        {
          id: 'iot',
          title: 'IoT',
          courses: [
            {
              id: 3,
              title: 'IoT Fundamentals',
              duration: '3 Months',
              description: 'Learn the basics of IoT, sensors, microcontrollers, and embedded systems.',
              topics: [
                'Introduction to IoT', 'Arduino Programming', 'Raspberry Pi Basics', 'Sensors & Actuators',
                'Communication Protocols (MQTT, HTTP)', 'Data Collection', 'Basic Electronics',
                'IoT Architecture', 'Cloud Integration Basics'
              ]
            },
            {
              id: 4,
              title: 'Embedded Systems Programming',
              duration: '2.5 Months',
              description: 'Programming microcontrollers and building basic IoT applications.',
              topics: [
                'C/C++ for Embedded Systems', 'GPIO Programming', 'Interrupts & Timers',
                'Serial Communication', 'SPI & I2C Protocols', 'Power Management', 'Real-time Systems'
              ]
            }
          ]
        },
        {
          id: 'cybersecurity',
          title: 'Cybersecurity',
          courses: [
            {
              id: 5,
              title: 'Cybersecurity Fundamentals',
              duration: '3 Months',
              description: 'Introduction to cybersecurity, threats, vulnerabilities, and basic security practices.',
              topics: [
                'Introduction to Cybersecurity', 'Threats & Vulnerabilities', 'Network Security Basics',
                'Cryptography Fundamentals', 'Authentication & Authorization', 'Firewalls & IDS/IPS',
                'Security Policies', 'Risk Assessment Basics', 'Ethical Hacking Introduction'
              ]
            },
            {
              id: 6,
              title: 'Network Security',
              duration: '2.5 Months',
              description: 'Learn network security protocols, VPNs, and secure communication.',
              topics: [
                'Network Protocols Security', 'VPN Technologies', 'SSL/TLS', 'Wireless Security',
                'Network Monitoring', 'Packet Analysis', 'Intrusion Detection'
              ]
            }
          ]
        },
        {
          id: 'web-mobile',
          title: 'Web and Mobile Development',
          courses: [
            {
              id: 7,
              title: 'Frontend Development',
              duration: '3 Months',
              description: 'Build responsive web applications using HTML, CSS, JavaScript, and modern frameworks.',
              topics: [
                'HTML5 & CSS3', 'JavaScript Fundamentals', 'DOM Manipulation', 'Responsive Design',
                'React Basics', 'State Management', 'Component Architecture', 'API Integration',
                'Build Tools (Webpack, Vite)', 'Version Control (Git)'
              ]
            },
            {
              id: 8,
              title: 'Mobile App Development',
              duration: '2.5 Months',
              description: 'Develop mobile applications for iOS and Android platforms.',
              topics: [
                'React Native Basics', 'Mobile UI/UX Design', 'Navigation', 'State Management',
                'API Integration', 'Native Modules', 'App Deployment', 'Performance Optimization'
              ]
            }
          ]
        },
        {
          id: 'data-engineering',
          title: 'Data Engineering',
          courses: [
            {
              id: 9,
              title: 'Data Engineering Fundamentals',
              duration: '3 Months',
              description: 'Introduction to data pipelines, ETL processes, and data warehousing.',
              topics: [
                'Introduction to Data Engineering', 'ETL Processes', 'Data Warehousing Concepts',
                'SQL Fundamentals', 'Database Design', 'Data Modeling', 'Python for Data Engineering',
                'Data Quality & Validation', 'Basic Data Pipelines'
              ]
            },
            {
              id: 10,
              title: 'Big Data Basics',
              duration: '2.5 Months',
              description: 'Introduction to big data technologies and distributed computing.',
              topics: [
                'Big Data Concepts', 'Hadoop Ecosystem', 'Apache Spark Basics', 'NoSQL Databases',
                'Data Lake Concepts', 'Streaming Data Basics', 'Cloud Data Platforms'
              ]
            }
          ]
        }
      ]
    },
    intermediate: {
      duration: '11.5 Months',
      categories: [
        {
          id: 'ai-ml',
          title: 'AI/ML',
          courses: [
            {
              id: 11,
              title: 'Advanced Machine Learning',
              duration: '3 Months',
              description: 'Deep dive into advanced ML algorithms, ensemble methods, and model optimization.',
              topics: [
                'Ensemble Methods', 'Gradient Boosting (XGBoost, LightGBM)', 'Support Vector Machines',
                'Dimensionality Reduction (PCA, t-SNE)', 'Hyperparameter Tuning', 'Model Selection',
                'Time Series Analysis', 'Natural Language Processing Basics', 'Computer Vision Basics'
              ]
            },
            {
              id: 12,
              title: 'Deep Learning Applications',
              duration: '2.5 Months',
              description: 'Build real-world applications using deep learning frameworks.',
              topics: [
                'Advanced CNN Architectures', 'Transfer Learning', 'Object Detection', 'Image Segmentation',
                'Sequence Models (LSTM, GRU)', 'Attention Mechanisms', 'Transformers Basics',
                'Model Deployment', 'TensorFlow Serving'
              ]
            }
          ]
        },
        {
          id: 'iot',
          title: 'IoT',
          courses: [
            {
              id: 13,
              title: 'Advanced IoT Development',
              duration: '3 Months',
              description: 'Build complex IoT systems with cloud integration and data analytics.',
              topics: [
                'IoT Cloud Platforms (AWS IoT, Azure IoT)', 'Edge Computing', 'Fog Computing',
                'IoT Data Analytics', 'Machine Learning on Edge', 'IoT Security', 'Device Management',
                'Firmware Development', 'OTA Updates'
              ]
            },
            {
              id: 14,
              title: 'IoT Protocols & Standards',
              duration: '2.5 Months',
              description: 'Master IoT communication protocols and industry standards.',
              topics: [
                'MQTT Advanced', 'CoAP', 'LoRaWAN', 'Zigbee', 'Bluetooth Low Energy (BLE)',
                '5G for IoT', 'IoT Standards (IEEE, IETF)', 'Protocol Security'
              ]
            }
          ]
        },
        {
          id: 'cybersecurity',
          title: 'Cybersecurity',
          courses: [
            {
              id: 15,
              title: 'Penetration Testing',
              duration: '3 Months',
              description: 'Learn ethical hacking, vulnerability assessment, and penetration testing techniques.',
              topics: [
                'Penetration Testing Methodology', 'Reconnaissance', 'Scanning & Enumeration',
                'Exploitation Techniques', 'Post-Exploitation', 'Web Application Security',
                'Network Penetration Testing', 'Report Writing', 'Tools (Metasploit, Burp Suite)'
              ]
            },
            {
              id: 16,
              title: 'Secure Coding Practices',
              duration: '2.5 Months',
              description: 'Develop secure applications following best practices and security standards.',
              topics: [
                'OWASP Top 10', 'Secure Coding Principles', 'Input Validation', 'Authentication Security',
                'Session Management', 'Cryptography Implementation', 'Security Testing', 'Code Review'
              ]
            }
          ]
        },
        {
          id: 'web-mobile',
          title: 'Web and Mobile Development',
          courses: [
            {
              id: 17,
              title: 'Full-Stack Development',
              duration: '3 Months',
              description: 'Build complete web applications with frontend and backend integration.',
              topics: [
                'Node.js & Express', 'RESTful APIs', 'Database Integration (MongoDB, PostgreSQL)',
                'Authentication & Authorization (JWT)', 'State Management (Redux)', 'Testing (Jest, Cypress)',
                'Deployment (Docker, AWS)', 'CI/CD Pipelines', 'Microservices Basics'
              ]
            },
            {
              id: 18,
              title: 'Advanced Mobile Development',
              duration: '2.5 Months',
              description: 'Build production-ready mobile applications with advanced features.',
              topics: [
                'Advanced React Native', 'Native Module Development', 'Performance Optimization',
                'Offline Capabilities', 'Push Notifications', 'In-App Purchases', 'Analytics Integration',
                'App Store Optimization', 'Cross-Platform Architecture'
              ]
            }
          ]
        },
        {
          id: 'data-engineering',
          title: 'Data Engineering',
          courses: [
            {
              id: 19,
              title: 'Data Pipeline Development',
              duration: '3 Months',
              description: 'Build scalable data pipelines using modern tools and frameworks.',
              topics: [
                'Apache Airflow', 'ETL/ELT Patterns', 'Data Orchestration', 'Workflow Management',
                'Data Quality Frameworks', 'Error Handling & Retries', 'Monitoring & Alerting',
                'Data Lineage', 'Schema Evolution'
              ]
            },
            {
              id: 20,
              title: 'Streaming Data Processing',
              duration: '2.5 Months',
              description: 'Process real-time data streams using Kafka, Spark Streaming, and Flink.',
              topics: [
                'Apache Kafka', 'Kafka Streams', 'Apache Spark Streaming', 'Apache Flink',
                'Event-Driven Architecture', 'Stream Processing Patterns', 'Real-time Analytics',
                'Data Streaming Best Practices'
              ]
            }
          ]
        }
      ]
    },
    advanced: {
      duration: '9.5 Months',
      categories: [
        {
          id: 'ai-ml',
          title: 'AI/ML',
          courses: [
            {
              id: 21,
              title: 'Advanced Deep Learning',
              duration: '3 Months',
              description: 'Master advanced deep learning architectures and cutting-edge AI techniques.',
              topics: [
                'Transformer Architectures', 'BERT, GPT Models', 'Computer Vision Advanced',
                'Generative Adversarial Networks (GANs)', 'Reinforcement Learning', 'AutoML',
                'Model Optimization & Quantization', 'Distributed Training', 'MLOps'
              ]
            },
            {
              id: 22,
              title: 'AI Production Systems',
              duration: '2.5 Months',
              description: 'Deploy and maintain AI systems in production environments.',
              topics: [
                'Model Serving', 'A/B Testing for ML', 'Model Monitoring', 'Feature Stores',
                'MLOps Pipelines', 'Kubeflow', 'Model Versioning', 'Production Best Practices'
              ]
            }
          ]
        },
        {
          id: 'iot',
          title: 'IoT',
          courses: [
            {
              id: 23,
              title: 'IoT Architecture & Design',
              duration: '3 Months',
              description: 'Design and implement enterprise-grade IoT solutions.',
              topics: [
                'IoT Architecture Patterns', 'Edge AI & ML', 'Digital Twins', 'IoT Analytics Platforms',
                'Industrial IoT (IIoT)', 'Smart City Solutions', 'IoT Security Architecture',
                'Scalability & Performance', 'IoT Standards & Compliance'
              ]
            },
            {
              id: 24,
              title: 'IoT Project Implementation',
              duration: '2.5 Months',
              description: 'End-to-end IoT project development and deployment.',
              topics: [
                'Project Planning & Architecture', 'Hardware Selection', 'Firmware Development',
                'Cloud Integration', 'Data Analytics & Visualization', 'System Integration',
                'Testing & Validation', 'Deployment & Maintenance'
              ]
            }
          ]
        },
        {
          id: 'cybersecurity',
          title: 'Cybersecurity',
          courses: [
            {
              id: 25,
              title: 'Advanced Security Operations',
              duration: '3 Months',
              description: 'Master security operations, incident response, and threat intelligence.',
              topics: [
                'Security Operations Center (SOC)', 'Incident Response', 'Threat Hunting',
                'Security Information and Event Management (SIEM)', 'Threat Intelligence',
                'Forensics & Investigation', 'Malware Analysis', 'Security Orchestration'
              ]
            },
            {
              id: 26,
              title: 'Security Architecture',
              duration: '2.5 Months',
              description: 'Design and implement comprehensive security architectures.',
              topics: [
                'Security Architecture Design', 'Zero Trust Architecture', 'Identity & Access Management',
                'Security Compliance (ISO 27001, NIST)', 'Risk Management', 'Security Auditing',
                'Cloud Security Architecture', 'DevSecOps'
              ]
            }
          ]
        },
        {
          id: 'web-mobile',
          title: 'Web and Mobile Development',
          courses: [
            {
              id: 27,
              title: 'Enterprise Web Applications',
              duration: '3 Months',
              description: 'Build scalable, enterprise-grade web applications.',
              topics: [
                'Microservices Architecture', 'API Gateway', 'Service Mesh', 'Distributed Systems',
                'Event-Driven Architecture', 'Caching Strategies', 'Load Balancing', 'Database Sharding',
                'Performance Optimization', 'Scalability Patterns'
              ]
            },
            {
              id: 28,
              title: 'Native Mobile Development',
              duration: '2.5 Months',
              description: 'Develop high-performance native mobile applications.',
              topics: [
                'iOS Development (Swift)', 'Android Development (Kotlin)', 'Native Performance',
                'Platform-Specific Features', 'App Architecture (MVVM, Clean Architecture)',
                'Testing & QA', 'App Store Deployment', 'Performance Tuning'
              ]
            }
          ]
        },
        {
          id: 'data-engineering',
          title: 'Data Engineering',
          courses: [
            {
              id: 29,
              title: 'Advanced Data Engineering',
              duration: '3 Months',
              description: 'Build large-scale data engineering solutions and data platforms.',
              topics: [
                'Data Lake Architecture', 'Data Mesh', 'Delta Lake', 'Data Cataloging',
                'Data Governance', 'Data Quality Frameworks', 'Advanced ETL Patterns',
                'Data Warehouse Modernization', 'Cloud Data Platforms (Snowflake, BigQuery)'
              ]
            },
            {
              id: 30,
              title: 'Real-Time Data Systems',
              duration: '2.5 Months',
              description: 'Design and implement real-time data processing systems.',
              topics: [
                'Real-Time Analytics', 'Lambda & Kappa Architectures', 'Event Streaming',
                'Change Data Capture (CDC)', 'Real-Time Dashboards', 'Streaming Analytics',
                'Data Pipeline Optimization', 'Monitoring & Observability'
              ]
            }
          ]
        }
      ]
    }
  };

  const toggleCourseExpansion = (courseId: number) => {
    setExpandedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const currentCategories = curriculumData[selectedLevel].categories;

  // SEO: Update document title and meta description
  useEffect(() => {
    document.title = 'Kachchapi - AI Skills Training & Industry-Ready Software Development Courses';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Master AI skills, machine learning, and software development with industry-ready training. Learn from experienced professionals with project-based learning, interview preparation, and career guidance.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <HeaderSinglePage onOpenModal={() => setIsModalOpen(true)} />
      <LiveDemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Hero Section with Form */}
      <section id="home" className="relative min-h-[500px] sm:min-h-[550px] flex flex-col lg:flex-row items-start overflow-visible bg-gradient-to-br from-dark-800 via-dark-700 to-dark-800 pb-8 lg:pb-24">
        {/* Left side - Dark background with program information */}
        <div className="w-full lg:w-1/2 text-white pt-8 pb-4 lg:pt-6 lg:pb-12 px-4 sm:px-6 lg:px-16 flex items-start relative">
          {/* Background silhouette effect */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-2xl w-full">
            {/* Top Banner */}
            <div className="bg-black px-4 py-2 rounded mb-8 inline-block">
              <p className="text-xs font-semibold">Learn by experience, learn from experienced</p>
            </div>

            {/* Main Headline - SEO Optimized */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal mb-6 leading-tight font-sans">
              Become <span className="text-primary-400">Future Ready</span> Software Developer with{' '}
              <span className="text-primary-400">AI Skills Training</span> - Industry-Ready Online Courses
            </h1>

            {/* Key Features */}
            <ul className="flex flex-wrap gap-4 mb-6">
              <li className="flex items-center text-sm">
                <span className="text-primary-400 mr-2">◆</span>
                AI/ ML
              </li>
              <li className="flex items-center text-sm">
                <span className="text-primary-400 mr-2">◆</span>
                IOT
              </li>
              <li className="flex items-center text-sm">
                <span className="text-primary-400 mr-2">◆</span>
                Cyber Security
              </li>
              <li className="flex items-center text-sm">
                <span className="text-primary-400 mr-2">◆</span>
                Web and Mobile Development
              </li>
              <li className="flex items-center text-sm">
                <span className="text-primary-400 mr-2">◆</span>
                Data Engineering
              </li>
              <li className="flex items-center text-sm">
                <span className="text-primary-400 mr-2">◆</span>
                Robotics
              </li>
            </ul>

            {/* Next Batch Information */}
            <div className="mt-8">
              <p className="text-sm">
                Next batch starts in <span className="text-yellow-400 font-bold">DECEMBER</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Booking Form */}
        <div className="w-full lg:w-1/2 flex items-start justify-center pt-4 pb-4 lg:pt-6 lg:pb-6 px-4 sm:px-6 lg:p-12 relative z-20">
          {/* Booking Form Card */}
          <div className="bg-white rounded-lg shadow-2xl p-4 sm:p-6 lg:p-8 w-full max-w-md font-sans relative z-20">
            <h4 className="font-black text-gray-900 mb-2 font-sans text-lg sm:text-xl">
              Book a <span className="text-secondary-500">Free</span> Live Session!
            </h4>
            <p className="text-gray-600 text-xs mb-4 sm:mb-6 font-sans">
              With Kachchapi Founders & Top Instructors
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4 font-sans">
              {/* Name Field */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full px-3 sm:px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-colors"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full px-3 sm:px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-colors"
                  required
                />
              </div>

              {/* Phone Field */}
              <div className="flex gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  className="px-2 sm:px-3 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none"
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                </select>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                  className="flex-1 px-3 sm:px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-colors"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmittingDemo}
                className="w-full bg-secondary-500 hover:bg-secondary-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-2.5 sm:py-3 px-6 text-sm rounded-lg transition-colors font-sans"
              >
                {isSubmittingDemo ? 'Submitting...' : 'Book Free Live Class'}
              </button>

              {/* Status Messages */}
              {demoSubmitStatus.type && (
                <div className={`p-3 rounded-lg text-sm ${
                  demoSubmitStatus.type === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {demoSubmitStatus.message}
                </div>
              )}

              {/* Disclaimer */}
            <p className="text-xs text-gray-500 font-sans">
              By creating an account I have read and agree to Kachchapi's{' '}
              <a href="#" className="text-accent-600 hover:underline">Terms</a> and{' '}
              <a href="#" className="text-accent-600 hover:underline">Privacy Policy</a>.
            </p>
            </form>
          </div>
        </div>

        {/* Program Details Card - Below form on mobile, overlapping on desktop */}
        <div className="relative lg:absolute bottom-0 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:translate-y-1/2 w-full lg:w-[60%] mt-8 lg:mt-0 -mb-8 lg:mb-0 z-10 px-4 sm:px-6 lg:px-4">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-[95%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-none mx-auto">
            {/* Top Bar with Purple Fill */}
            <div className="h-2 w-full" style={{
              backgroundColor: 'rgba(147, 51, 234, 0.9)'
            }}></div>
            
            <div className="p-4 sm:p-6">
              {/* Three Column Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 mb-0 md:mb-6">
                <div className="border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-6">
                  <h3 className="text-gray-500 text-xs uppercase mb-2 font-montserrat">WHO THIS IS FOR</h3>
                  <p className="text-black-500 font-medium text-sm font-montserrat">Working Professionals</p>
                </div>
                <div className="border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-6 md:pl-6">
                    <h3 className="text-gray-500 text-xs uppercase mb-2 font-montserrat">READY TO MASTER</h3>
                  <p className="text-gray-900 font-medium text-sm font-montserrat">Gen AI + Software Development</p>
                </div>
                <div className="md:pl-6">
                  <h3 className="text-gray-500 text-xs uppercase mb-2 font-montserrat">LEARNING FORMAT</h3>
                  <p className="text-gray-900 font-medium text-sm font-montserrat">Live Classes with 24/7 AI Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}

      {/* Programs Section */}
      <section id="programs" className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3 sm:mb-4 font-sans px-4">
              Our Programs & Services
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Choose the program that fits your career goals
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg p-6 hover:shadow-lg transition-all border border-gray-200"
              >
                <h3 className="text-xl font-black text-gray-900 mb-3 font-sans">{program.title}</h3>
                <p className="text-gray-600 mb-4 text-xs">{program.description}</p>
                <div className="flex gap-4 text-xs text-gray-500 mb-4">
                  <span>⏱️ {program.duration}</span>
                  <span>📊 {program.level}</span>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-primary-500 hover:text-primary-600 font-semibold text-sm"
                >
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section - SEO Optimized */}
      <section id="curriculum" className="py-12 sm:py-16 md:py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-wide mb-2 font-sans">AI SKILLS & SOFTWARE DEVELOPMENT CURRICULUM</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4 font-sans px-4">
              Industry-Ready AI Training Curriculum: Master Machine Learning, Gen AI & Software Development
            </h2>
          </div>

          {/* Level Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
            {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`p-6 rounded-lg border-2 transition-all ${
                  selectedLevel === level
                    ? 'bg-accent-500 border-accent-500 text-white'
                    : 'bg-dark-800 border-dark-700 text-white hover:border-dark-600'
                }`}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-end space-x-1">
                    {[1, 2, 3].map((bar, idx) => (
                      <div
                        key={idx}
                        className={`w-3 ${
                          selectedLevel === level && level === 'beginner' && idx === 0
                            ? 'bg-accent-400'
                            : selectedLevel === level
                            ? 'bg-white'
                            : 'bg-gray-500'
                        }`}
                        style={{ height: `${(idx + 1) * 8}px` }}
                      />
                    ))}
                  </div>
                </div>
                <h3 className="text-lg font-normal mb-2 capitalize">{level}</h3>
                <p className="text-sm opacity-90">{curriculumData[level].duration}</p>
              </button>
            ))}
          </div>

          {/* Categories Section */}
          <div className="mb-6 sm:mb-8 space-y-6 sm:space-y-8">
            {currentCategories.map((category) => (
              <div key={category.id} className="mb-6 sm:mb-8">
                <div className="flex items-center mb-4 sm:mb-6">
                  <span className="text-white text-xl sm:text-2xl mr-2 sm:mr-3">✦</span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white font-sans">
                    {category.title}
                  </h3>
                </div>

                {/* Course Cards for this Category */}
                <div className="space-y-3 sm:space-y-4">
                  {category.courses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-dark-800 border border-dark-700 rounded-lg overflow-hidden"
                    >
                      {/* Course Header */}
                      <div
                        className="p-4 sm:p-6 cursor-pointer flex items-center justify-between hover:bg-dark-700 transition-colors"
                        onClick={() => toggleCourseExpansion(course.id)}
                      >
                        <div className="flex items-center flex-1 min-w-0">
                          <span className="text-white text-lg sm:text-xl mr-2 sm:mr-4 flex-shrink-0">&lt; /&gt;</span>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base sm:text-lg font-bold text-white font-sans mb-1 break-words">
                              {course.title}
                            </h4>
                            {course.description && (
                              <p className="text-gray-400 text-xs sm:text-sm font-sans line-clamp-2">{course.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0 ml-2">
                          {course.duration && (
                            <span className="bg-dark-700 text-white text-xs px-2 sm:px-3 py-1 rounded-full font-sans whitespace-nowrap hidden sm:inline-block">
                              {course.duration}
                            </span>
                          )}
                          <svg
                            className={`w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform flex-shrink-0 ${
                              expandedCourses.includes(course.id) ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {expandedCourses.includes(course.id) && course.topics && (
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 border-t border-dark-700">
                          <div className="mt-3 sm:mt-4">
                            <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 font-sans">Topics covered:</p>
                            <div className="flex flex-wrap gap-2">
                              {course.topics.map((topic: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="bg-dark-700 border border-dark-600 text-white text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded font-sans"
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Hidden for now */}
      {/* <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 font-sans">
              What Our Students Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-md"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ Section - SEO Optimized */}
      <section id="faq" className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3 sm:mb-4 font-sans px-4">
              Frequently Asked Questions About AI Skills Training & Online Courses
            </h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg font-sans"
              >
                <summary className="font-semibold text-gray-900 text-sm sm:text-base select-none font-sans pr-6">
                  {faq.question}
                </summary>
                <div className="text-gray-600 font-sans text-xs sm:text-sm mt-2">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - SEO Optimized */}
      <section id="cta" className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-dark-800 to-dark-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 font-sans px-4">
            Ready to Master AI Skills & Transform Your Career?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 px-4">
            Start your journey with industry-ready AI training, machine learning courses, and software development skills. Book a free live demo and get personalized career guidance.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-primary-600 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Book Your Live Demo Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SinglePageLayout;

