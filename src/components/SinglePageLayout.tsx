import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faUserTie, faRoute, faUsers, faGraduationCap, faBuilding } from '@fortawesome/free-solid-svg-icons';
import LiveDemoModal from './LiveDemoModal';
import ServiceModal from './ServiceModal';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import HeaderSinglePage from './HeaderSinglePage';
import Footer from './Footer';
import { sendDemoSessionEmail } from '../services/emailService';

const SinglePageLayout: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isTermsOfServiceOpen, setIsTermsOfServiceOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    title: string;
    description: string;
    duration: string;
    level: string;
    details?: string[];
    benefits?: string[];
  } | null>(null);
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
  const [searchQuery, setSearchQuery] = useState('');
  const curriculumSectionRef = useRef<HTMLElement>(null);
  const firstCourseRef = useRef<HTMLDivElement>(null);

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
      title: 'Project-Based Training',
      description: 'Hands-on project-based learning in AI/ML, Gen AI, software development, web development, and mobile development. Build industry-ready skills through real-world projects.',
      duration: '3-12 months',
      level: 'All Levels',
      details: [
        'Real-world project development across multiple technologies',
        'Industry-standard tools and frameworks',
        'Portfolio building with 5+ completed projects',
        'Code reviews and best practices',
        'Git version control and collaboration',
        'Deployment and DevOps basics'
      ],
      benefits: [
        'Build a strong portfolio of projects',
        'Gain hands-on experience with industry tools',
        'Learn from experienced mentors',
        'Get ready for job interviews'
      ]
    },
    {
      title: 'Interview Preparation',
      description: 'Comprehensive interview coaching for AI, machine learning, and software engineering positions. Technical assessments, coding practice, system design, and mock interviews.',
      duration: '2-6 months',
      level: 'All Levels',
      details: [
        'Technical coding assessments and practice',
        'System design interview preparation',
        'Mock interviews with industry experts',
        'Behavioral interview coaching',
        'Resume and LinkedIn optimization',
        'Salary negotiation guidance'
      ],
      benefits: [
        'Ace technical interviews',
        'Build confidence through practice',
        'Get personalized feedback',
        'Land your dream job'
      ]
    },
    {
      title: 'Career Guidance',
      description: 'Personalized career counseling and roadmap development for AI, machine learning, and software development careers. Professional goal setting and industry insights.',
      duration: 'Ongoing',
      level: 'All Levels',
      details: [
        'Personalized career roadmap',
        'Industry trend analysis',
        'Skill gap assessment',
        'Professional goal setting',
        'Career transition support',
        'Networking opportunities'
      ],
      benefits: [
        'Clear career path forward',
        'Industry insights and trends',
        'Personalized guidance',
        'Long-term career support'
      ]
    },
    {
      title: 'Leadership Coaching',
      description: 'Develop essential leadership skills, team management, and communication abilities for tech leadership roles in AI and software development organizations.',
      duration: '3-6 months',
      level: 'Intermediate to Advanced',
      details: [
        'Leadership fundamentals and principles',
        'Team management strategies',
        'Effective communication techniques',
        'Conflict resolution skills',
        'Decision-making frameworks',
        'Building high-performing teams'
      ],
      benefits: [
        'Advance to leadership roles',
        'Manage teams effectively',
        'Improve communication skills',
        'Drive organizational success'
      ]
    },
    {
      title: 'Academic Project Mentorship',
      description: 'Expert guidance and mentorship for academic projects, research work, and thesis development',
      duration: '3-12 months',
      level: 'All Levels',
      details: [
        'Project ideation and planning',
        'Research methodology guidance',
        'Technical implementation support',
        'Thesis writing assistance',
        'Code review and optimization',
        'Presentation preparation'
      ],
      benefits: [
        'Complete projects successfully',
        'Learn research methodologies',
        'Get expert guidance',
        'Excel in academics'
      ]
    },
    {
      title: 'Corporate Training',
      description: 'Comprehensive technical training programs for corporate teams to enhance skills and productivity',
      duration: 'Flexible',
      level: 'All Levels',
      details: [
        'Customized curriculum for teams',
        'On-site or remote training options',
        'Hands-on workshops and labs',
        'Industry-relevant content',
        'Team-based projects',
        'Post-training support'
      ],
      benefits: [
        'Upskill your entire team',
        'Increase productivity',
        'Stay competitive',
        'Flexible scheduling'
      ]
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
    },
    {
      question: 'Can I take multiple courses in combination?',
      answer: 'Yes! You can combine multiple courses from different categories (AI/ML, Backend Development, Frontend Development, etc.) to create a customized learning path that matches your career goals. For example, you can combine Python, Machine Learning, and Backend Development courses to build full-stack AI applications.'
    },
    {
      question: 'Are the courses customizable based on my needs?',
      answer: 'Absolutely! Our curriculum is flexible and can be customized to fit your specific learning objectives, industry requirements, or career goals. You can select individual courses, combine courses from different levels, or follow a complete level-based program. Contact our advisors to discuss your customized learning path.'
    },
    {
      question: 'Can I mix courses from Beginner, Intermediate, and Advanced levels?',
      answer: 'Yes, you can mix courses across different levels based on your prior knowledge and learning goals. For instance, if you\'re already familiar with Python basics, you can start with Intermediate-level AI/ML courses while taking Beginner-level courses in other areas like Backend Development. Our advisors will help you create the optimal combination.'
    },
    {
      question: 'How do course combinations work for project-based learning?',
      answer: 'When you combine multiple courses, you\'ll work on integrated projects that apply concepts from all your selected courses. For example, combining LLMs, Backend Development, and Frontend Development courses will result in a comprehensive project building a full-stack AI application with LLM integration, giving you end-to-end industry experience.'
    },
    {
      question: 'Can I customize the curriculum for my organization or team?',
      answer: 'Yes, we offer customized corporate training programs. Organizations can select specific courses, combine them based on team requirements, and we\'ll tailor the curriculum, projects, and delivery schedule to fit your business needs. Contact us to discuss enterprise training solutions.'
    },
    {
      question: 'What are some of the job roles that they can expect if they complete these courses?',
      answer: 'Upon successful completion of our courses, you can pursue various roles including: AI/ML Engineer, Machine Learning Engineer, Deep Learning Engineer, LLM Engineer, Data Scientist, Backend Developer, Full-Stack Developer, Software Engineer, Python Developer, MLOps Engineer, AI Research Scientist, NLP Engineer, Computer Vision Engineer, Data Engineer, and DevOps Engineer. The specific roles depend on the course combinations you choose.'
    },
    {
      question: 'What are the industries that are looking for these roles?',
      answer: 'These roles are in high demand across multiple industries including: Technology & Software (FAANG, startups, tech companies), Finance & Banking (FinTech, algorithmic trading, fraud detection), Healthcare (medical imaging, drug discovery, health analytics), E-commerce & Retail (recommendation systems, supply chain optimization), Automotive (autonomous vehicles, IoT), Manufacturing (predictive maintenance, quality control), Consulting (AI consulting, digital transformation), Education Technology, Government & Defense, Telecommunications, Energy & Utilities, and many more sectors undergoing digital transformation.'
    },
    {
      question: 'Will there be a placement assistance provided on successful completion?',
      answer: 'Yes, we provide comprehensive placement assistance to all students who successfully complete our courses. This includes resume building, interview preparation, mock interviews, job search guidance, networking opportunities, and connections with our industry partners. Our career support team works closely with you to help you land your dream job in AI, machine learning, and software development roles.'
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
              title: 'Python',
              duration: '3 Months',
              description: 'Master Python programming fundamentals, syntax, data structures, and libraries for AI/ML.',
              topics: [
                'Python Basics & Syntax', 'Data Types & Variables', 'Control Flow (if/else, loops)', 'Functions & Modules',
                'Data Structures (Lists, Tuples, Dictionaries, Sets)', 'Object-Oriented Programming (OOP)',
                'NumPy Fundamentals', 'Pandas for Data Analysis', 'Matplotlib & Seaborn for Visualization',
                'File I/O Operations', 'Exception Handling', 'Python Standard Library'
              ],
              expectedOutcomes: [
                'Write clean, efficient Python code for data analysis and AI/ML applications',
                'Manipulate and analyze data using NumPy and Pandas libraries',
                'Build object-oriented programs and reusable code modules',
                'Create data visualizations and reports using Matplotlib and Seaborn'
              ]
            },
            {
              id: 2,
              title: 'Introduction to Machine Learning',
              duration: '3 Months',
              description: 'Learn the fundamentals of machine learning, data preprocessing, and basic algorithms.',
              topics: [
                'Introduction to ML', 'Data Preprocessing', 'Linear Regression', 'Logistic Regression',
                'Decision Trees', 'Random Forest', 'K-Means Clustering', 'Model Evaluation',
                'Cross-Validation', 'Feature Engineering', 'Overfitting & Regularization', 'Python for ML', 'NumPy & Pandas'
              ],
              expectedOutcomes: [
                'Build and evaluate machine learning models using supervised and unsupervised algorithms',
                'Preprocess and clean data for ML applications',
                'Apply feature engineering techniques to improve model performance',
                'Understand model evaluation metrics and avoid overfitting'
              ]
            },
            {
              id: 3,
              title: 'Deep Learning',
              duration: '2.5 Months',
              description: 'Introduction to neural networks and fundamental deep learning concepts.',
              topics: [
                'Neural Networks Basics', 'Activation Functions', 'Gradient Descent', 'PyTorch Basics',
                'Basic Model Training'
              ],
              expectedOutcomes: [
                'Understand neural network architecture and how they learn',
                'Build and train basic neural networks using PyTorch',
                'Implement gradient descent and optimization algorithms',
                'Create simple deep learning models for classification tasks'
              ]
            }
          ]
        },
        {
          id: 'iot',
          title: 'IoT',
          courses: [
            {
              id: 4,
              title: 'IoT Fundamentals',
              duration: '3 Months',
              description: 'Learn the basics of IoT, sensors, microcontrollers, and embedded systems.',
              topics: [
                'Introduction to IoT', 'Arduino Programming', 'Raspberry Pi Basics', 'Sensors & Actuators',
                'Communication Protocols (MQTT, HTTP)', 'Data Collection', 'Basic Electronics',
                'IoT Architecture', 'Cloud Integration Basics'
              ],
              expectedOutcomes: [
                'Design and build basic IoT systems using Arduino and Raspberry Pi',
                'Interface sensors and actuators with microcontrollers',
                'Implement IoT communication protocols for data transmission',
                'Create simple IoT applications with cloud connectivity'
              ]
            },
            {
              id: 5,
              title: 'Embedded Systems Programming',
              duration: '2.5 Months',
              description: 'Programming microcontrollers and building basic IoT applications.',
              topics: [
                'C/C++ for Embedded Systems', 'GPIO Programming', 'Interrupts & Timers',
                'Serial Communication', 'SPI & I2C Protocols', 'Power Management', 'Real-time Systems'
              ],
              expectedOutcomes: [
                'Write efficient embedded code in C/C++ for microcontrollers',
                'Implement real-time systems with interrupts and timers',
                'Use communication protocols (SPI, I2C) for device interfacing',
                'Optimize power consumption in embedded applications'
              ]
            }
          ]
        },
        {
          id: 'cybersecurity',
          title: 'Cybersecurity',
          courses: [
            {
              id: 6,
              title: 'Cybersecurity Fundamentals',
              duration: '3 Months',
              description: 'Introduction to cybersecurity, threats, vulnerabilities, and basic security practices.',
              topics: [
                'Introduction to Cybersecurity', 'Threats & Vulnerabilities', 'Network Security Basics',
                'Cryptography Fundamentals', 'Authentication & Authorization', 'Firewalls & IDS/IPS',
                'Security Policies', 'Risk Assessment Basics', 'Ethical Hacking Introduction'
              ],
              expectedOutcomes: [
                'Identify and assess cybersecurity threats and vulnerabilities',
                'Implement basic security controls and policies',
                'Understand cryptography principles and authentication mechanisms',
                'Configure firewalls and intrusion detection systems'
              ]
            },
            {
              id: 7,
              title: 'Network Security',
              duration: '2.5 Months',
              description: 'Learn network security protocols, VPNs, and secure communication.',
              topics: [
                'Network Protocols Security', 'VPN Technologies', 'SSL/TLS', 'Wireless Security',
                'Network Monitoring', 'Packet Analysis', 'Intrusion Detection'
              ],
              expectedOutcomes: [
                'Secure network communications using VPN and SSL/TLS protocols',
                'Monitor and analyze network traffic for security threats',
                'Implement wireless security measures',
                'Detect and respond to network intrusions'
              ]
            }
          ]
        },
        {
          id: 'web-mobile',
          title: 'Web and Mobile Development',
          courses: [
            {
              id: 8,
              title: 'Frontend Development',
              duration: '3 Months',
              description: 'Build responsive web applications using HTML, CSS, JavaScript, and modern frameworks.',
              topics: [
                'HTML5 & CSS3', 'JavaScript Fundamentals', 'DOM Manipulation', 'Responsive Design',
                'React Basics', 'State Management', 'Component Architecture', 'API Integration',
                'Build Tools (Webpack, Vite)', 'Version Control (Git)'
              ],
              expectedOutcomes: [
                'Build responsive and interactive web applications using React',
                'Implement modern UI/UX designs with HTML5, CSS3, and JavaScript',
                'Manage application state and integrate with REST APIs',
                'Use build tools and version control for professional development workflows'
              ]
            },
            {
              id: 9,
              title: 'Backend Development',
              duration: '3 Months',
              description: 'Learn server-side programming, APIs, databases, and backend architecture fundamentals.',
              topics: [
                'Introduction to Server-Side Programming', 'Node.js & Express', 'Java / Python / C#','Database Fundamentals (SQL)', 'RESTful API Design', 
                'MongoDB Basics', 'Authentication & Authorization', 'API Documentation', 'Error Handling',
                'Middleware Concepts', 'Basic Security Practices'
              ],
              expectedOutcomes: [
                'Build RESTful APIs and server-side applications',
                'Design and implement database schemas using SQL and NoSQL',
                'Implement authentication and authorization mechanisms',
                'Create secure and scalable backend services'
              ]
            },
            {
              id: 10,
              title: 'Mobile App Development',
              duration: '2.5 Months',
              description: 'Develop mobile applications for iOS and Android platforms.',
              topics: [
                'React Native Basics', 'Mobile UI/UX Design', 'Navigation', 'State Management',
                'API Integration', 'Native Modules', 'App Deployment', 'Performance Optimization'
              ],
              expectedOutcomes: [
                'Build cross-platform mobile applications using React Native',
                'Design intuitive mobile user interfaces and navigation flows',
                'Integrate mobile apps with backend APIs and services',
                'Deploy and optimize mobile applications for app stores'
              ]
            }
          ]
        },
        {
          id: 'data-engineering',
          title: 'Data Engineering',
          courses: [
            {
              id: 11,
              title: 'Data Engineering Fundamentals',
              duration: '3 Months',
              description: 'Introduction to data pipelines, ETL processes, and data warehousing.',
              topics: [
                'Introduction to Data Engineering', 'ETL Processes', 'Data Warehousing Concepts',
                'SQL Fundamentals', 'Database Design', 'Data Modeling', 'Python for Data Engineering',
                'Data Quality & Validation', 'Basic Data Pipelines'
              ],
              expectedOutcomes: [
                'Design and implement ETL processes for data transformation',
                'Build data warehouses and design efficient database schemas',
                'Create data pipelines using Python and SQL',
                'Ensure data quality and validation in data engineering workflows'
              ]
            },
            {
              id: 12,
              title: 'Big Data Basics',
              duration: '2.5 Months',
              description: 'Introduction to big data technologies and distributed computing.',
              topics: [
                'Big Data Concepts & pySpark', 'Apache Spark Basics', 'NoSQL Databases',
                'Data Lake Concepts', 'Streaming Data Basics (Kafka & Flink)', 'Cloud Data Platforms'
              ],
              expectedOutcomes: [
                'Process large-scale data using Apache Spark and pySpark',
                'Work with NoSQL databases and data lake architectures',
                'Implement streaming data pipelines with Kafka and Flink',
                'Deploy big data solutions on cloud platforms'
              ]
            }
          ]
        },
        {
          id: 'executive-leadership',
          title: 'Executive & Leadership Skills',
          courses: [
            {
              id: 34,
              title: 'Emerging Leaders (First-Time Managers)',
              duration: '6 Months',
              description: 'Elevate your leadership capabilities with our premium coaching program designed exclusively for executives and senior leaders seeking transformational growth.',
              topics: [
                'Verbal & Non-Verbal Communication', 'Communication Strategies', 'Listening Skills',
                'Presentation Skills', 'Email & Business Writing Etiquette', 'Interpersonal Skills'
              ],
              expectedOutcomes: [
                'Confidently manage teams with strong communication',
                'Transition smoothly into leadership with credibility',
                'Drive team performance with clarity and trust'
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
              title: 'Python',
              duration: '3 Months',
              description: 'Master advanced Python programming, design patterns, and ML/AI frameworks.',
              topics: [
                'Advanced OOP Concepts', 'Decorators & Generators', 'Context Managers', 'Concurrency & Parallelism',
                'Async/Await Programming', 'Scikit-learn Advanced', 'TensorFlow & PyTorch',
                'Natural Language Processing (NLTK, spaCy)', 'Computer Vision (OpenCV)', 'ML Pipeline Development',
                'Testing (pytest)', 'Performance Optimization'
              ],
              expectedOutcomes: [
                'Write advanced Python code with design patterns and concurrency',
                'Build ML pipelines using TensorFlow, PyTorch, and Scikit-learn',
                'Implement NLP and computer vision applications',
                'Optimize Python code performance and write comprehensive tests'
              ]
            },
            {
              id: 12,
              title: 'Advanced Machine Learning',
              duration: '3 Months',
              description: 'Deep dive into advanced ML algorithms, ensemble methods, and model optimization.',
              topics: [
                'Ensemble Methods', 'Gradient Boosting (XGBoost, LightGBM)', 'Support Vector Machines',
                'Dimensionality Reduction (PCA, t-SNE)', 'Hyperparameter Tuning', 'Model Selection',
                'Time Series Analysis', 'Natural Language Processing Basics', 'Computer Vision Basics'
              ],
              expectedOutcomes: [
                'Build high-performance ML models using ensemble methods and gradient boosting',
                'Optimize models through hyperparameter tuning and feature engineering',
                'Apply advanced techniques for time series, NLP, and computer vision',
                'Select and evaluate models for production deployment'
              ]
            },
            {
              id: 13,
              title: 'Deep Learning',
              duration: '2.5 Months',
              description: 'Master intermediate deep learning concepts and neural network architectures.',
              topics: [
                'Backpropagation', 'Convolutional Neural Networks (CNN)', 'PyTorch Intermediate',
                'Advanced CNN Architectures', 'Transfer Learning', 'Object Detection', 'Image Segmentation',
                'Model Deployment'
              ],
              expectedOutcomes: [
                'Build and train CNN models for image classification and object detection',
                'Implement transfer learning to leverage pre-trained models',
                'Deploy deep learning models to production environments',
                'Apply advanced CNN architectures for complex computer vision tasks'
              ]
            },
            {
              id: 14,
              title: 'LLMs',
              duration: '3 Months',
              description: 'Master Large Language Models, from basics to building production applications.',
              topics: [
                'LLM Basics & Architecture (GPT, Transformer, Seq2Seq, Attention Mechanisms, Positional Embeddings, Tokenization - BPE, SentencePiece, tiktoken)',
                'Using Paid LLMs (OpenAI ChatGPT, Anthropic Claude, xAI Grok, Google Gemini, Mistral AI - APIs, Pricing, Context Limits, Safety Constraints)',
                'Open-Source LLMs (LLaMA, Mistral, Gemma, Qwen, Phi - Running Locally with Ollama, LM Studio, HuggingFace Transformers, Quantization 8-bit/4-bit/QLoRA)',
                'Prompt Engineering (Zero-shot, One-shot, Few-shot, Chain of Thought, Self-consistency, ReAct, Tree-of-Thought, RAG Prompting, Safety)',
                'Basics of RAG (Vector Embeddings, Vector Databases - Milvus, ChromaDB, FAISS, RAG Pipeline - Chunking, Indexing, Retrieval, Augmentation, RAG Evaluation)'
              ],
              expectedOutcomes: [
                'Understand LLM architecture and work with both paid and open-source models',
                'Master advanced prompt engineering techniques for optimal results',
                'Build RAG applications with vector databases and retrieval systems',
                'Deploy LLM-powered applications in production environments'
              ]
            }
          ]
        },
        {
          id: 'iot',
          title: 'IoT',
          courses: [
            {
              id: 14,
              title: 'Advanced IoT Development',
              duration: '3 Months',
              description: 'Build complex IoT systems with cloud integration and data analytics.',
              topics: [
                'IoT Cloud Platforms (AWS IoT, Azure IoT)', 'Edge Computing', 'Fog Computing',
                'IoT Data Analytics', 'Machine Learning on Edge', 'IoT Security', 'Device Management',
                'Firmware Development', 'OTA Updates'
              ],
              expectedOutcomes: [
                'Design and deploy enterprise IoT solutions on cloud platforms',
                'Implement edge computing and ML models for IoT devices',
                'Manage IoT device fleets and implement OTA updates',
                'Build secure and scalable IoT architectures'
              ]
            },
            {
              id: 15,
              title: 'IoT Protocols & Standards',
              duration: '2.5 Months',
              description: 'Master IoT communication protocols and industry standards.',
              topics: [
                'MQTT Advanced', 'CoAP', 'LoRaWAN', 'Zigbee', 'Bluetooth Low Energy (BLE)',
                '5G for IoT', 'IoT Standards (IEEE, IETF)', 'Protocol Security'
              ],
              expectedOutcomes: [
                'Implement advanced IoT communication protocols (MQTT, CoAP, LoRaWAN)',
                'Design secure IoT networks using industry standards',
                'Optimize IoT protocols for different use cases and environments',
                'Ensure protocol-level security and compliance'
              ]
            }
          ]
        },
        {
          id: 'cybersecurity',
          title: 'Cybersecurity',
          courses: [
            {
              id: 16,
              title: 'Penetration Testing',
              duration: '3 Months',
              description: 'Learn ethical hacking, vulnerability assessment, and penetration testing techniques.',
              topics: [
                'Penetration Testing Methodology', 'Reconnaissance', 'Scanning & Enumeration',
                'Exploitation Techniques', 'Post-Exploitation', 'Web Application Security',
                'Network Penetration Testing', 'Report Writing', 'Tools (Metasploit, Burp Suite)'
              ],
              expectedOutcomes: [
                'Conduct comprehensive penetration tests on networks and web applications',
                'Identify and exploit security vulnerabilities ethically',
                'Use professional tools like Metasploit and Burp Suite effectively',
                'Document findings and provide actionable security recommendations'
              ]
            },
            {
              id: 17,
              title: 'Secure Coding Practices',
              duration: '2.5 Months',
              description: 'Develop secure applications following best practices and security standards.',
              topics: [
                'OWASP Top 10', 'Secure Coding Principles', 'Input Validation', 'Authentication Security',
                'Session Management', 'Cryptography Implementation', 'Security Testing', 'Code Review'
              ],
              expectedOutcomes: [
                'Write secure code following OWASP guidelines and best practices',
                'Implement robust authentication, authorization, and session management',
                'Apply cryptography and input validation to prevent common vulnerabilities',
                'Perform security testing and code reviews to identify security issues'
              ]
            }
          ]
        },
        {
          id: 'web-mobile',
          title: 'Web and Mobile Development',
          courses: [
            {
              id: 18,
              title: 'Full-Stack Development',
              duration: '3 Months',
              description: 'Build complete web applications with frontend and backend integration.',
              topics: [
                'Node.js & Express', 'RESTful APIs', 'Database Integration (MongoDB, PostgreSQL)',
                'Authentication & Authorization (JWT)', 'State Management (Redux)', 'Testing (Jest, Cypress)',
                'Deployment (Docker, AWS)', 'CI/CD Pipelines', 'Microservices Basics'
              ],
              expectedOutcomes: [
                'Build end-to-end full-stack applications with frontend and backend integration',
                'Implement authentication, state management, and database operations',
                'Write comprehensive tests and deploy applications using Docker and CI/CD',
                'Design and implement microservices architectures'
              ]
            },
            {
              id: 19,
              title: 'Backend Development',
              duration: '3 Months',
              description: 'Master advanced backend development, APIs, databases, and server architecture.',
              topics: [
                'Advanced Node.js & Express', 'Advanced Java/ Python/ C#', 'GraphQL APIs', 'Database Optimization', 'Caching Strategies (Redis)',
                'Message Queues (RabbitMQ, Kafka)', 'Microservices Architecture', 'API Gateway', 'Serverless Functions',
                'Database Migrations', 'Advanced Security (OAuth, RBAC)'
              ],
              expectedOutcomes: [
                'Design and build scalable backend systems with microservices architecture',
                'Implement GraphQL and RESTful APIs with advanced security (OAuth, RBAC)',
                'Optimize databases and implement caching strategies for high performance',
                'Deploy serverless functions and manage message queues for distributed systems'
              ]
            },
            {
              id: 20,
              title: 'Advanced Mobile Development',
              duration: '2.5 Months',
              description: 'Build production-ready mobile applications with advanced features.',
              topics: [
                'Advanced React Native', 'Native Module Development', 'Performance Optimization',
                'Offline Capabilities', 'Push Notifications', 'In-App Purchases', 'Analytics Integration',
                'App Store Optimization', 'Cross-Platform Architecture'
              ],
              expectedOutcomes: [
                'Build high-performance mobile apps with advanced React Native features',
                'Implement native modules, offline capabilities, and push notifications',
                'Integrate analytics, in-app purchases, and optimize for app stores',
                'Design scalable cross-platform mobile architectures'
              ]
            }
          ]
        },
        {
          id: 'data-engineering',
          title: 'Data Engineering',
          courses: [
            {
              id: 21,
              title: 'Data Pipeline Development',
              duration: '3 Months',
              description: 'Build scalable data pipelines using modern tools and frameworks.',
              topics: [
                'Apache Airflow', 'ETL/ELT Patterns', 'Data Orchestration', 'Workflow Management',
                'Data Quality Frameworks', 'Error Handling & Retries', 'Monitoring & Alerting',
                'Data Lineage', 'Schema Evolution'
              ],
              expectedOutcomes: [
                'Design and build scalable data pipelines using Apache Airflow',
                'Implement ETL/ELT patterns with data quality frameworks',
                'Orchestrate complex workflows with monitoring and error handling',
                'Manage data lineage and schema evolution in production systems'
              ]
            },
            {
              id: 22,
              title: 'Streaming Data Processing',
              duration: '2.5 Months',
              description: 'Process real-time data streams using Kafka, Spark Streaming, and Flink.',
              topics: [
                'Apache Kafka', 'Kafka Streams', 'Apache Spark Streaming', 'Apache Flink',
                'Event-Driven Architecture', 'Stream Processing Patterns', 'Real-time Analytics',
                'Data Streaming Best Practices'
              ],
              expectedOutcomes: [
                'Build real-time streaming data pipelines with Kafka and Flink',
                'Process high-volume data streams using Spark Streaming',
                'Design event-driven architectures for real-time analytics',
                'Implement best practices for streaming data processing'
              ]
            }
          ]
        },
        {
          id: 'executive-leadership',
          title: 'Executive & Leadership Skills',
          courses: [
            {
              id: 35,
              title: 'Mid-Level Leaders (Senior Managers)',
              duration: '6 Months',
              description: 'Elevate your leadership capabilities with our premium coaching program designed exclusively for executives and senior leaders seeking transformational growth.',
              topics: [
                'Ethical Communication', 'Cross-Cultural Communication', 'Negotiation & Persuasion Skills',
                'Decision-Making Communication', 'Conflict Management', 'Change Communication'
              ],
              expectedOutcomes: [
                'Enhance leadership credibility across functions',
                'Successfully manage diverse, multicultural teams',
                'Strengthen decision-making impact at the organizational level'
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
              title: 'Python',
              duration: '3 Months',
              description: 'Master expert-level Python programming for AI/ML engineering and production systems.',
              topics: [
                'Advanced Python Internals', 'Cython & Performance', 'Distributed Systems with Python',
                'MLOps with Python', 'Model Serving (FastAPI, Flask)', 'Feature Engineering Pipelines',
                'Model Monitoring & Observability', 'Distributed ML Training', 'AutoML Frameworks',
                'Production ML Systems', 'CI/CD for ML', 'Model Governance & Compliance'
              ],
              expectedOutcomes: [
                'Build production-grade ML systems with MLOps best practices',
                'Optimize Python code performance using Cython and advanced techniques',
                'Deploy and monitor ML models at scale with CI/CD pipelines',
                'Implement distributed ML training and feature engineering pipelines'
              ]
            },
            {
              id: 22,
              title: 'Deep Learning',
              duration: '3 Months',
              description: 'Master advanced deep learning architectures and cutting-edge AI techniques.',
              topics: [
                'Recurrent Neural Networks (RNN)', 'LSTM & GRU Networks', 'PyTorch Advanced',
                'Transformer Architectures', 'BERT, GPT Models', 'Computer Vision Advanced',
                'Generative Adversarial Networks (GANs)', 'Reinforcement Learning', 'AutoML',
                'Model Optimization & Quantization', 'Distributed Training', 'MLOps'
              ],
              expectedOutcomes: [
                'Build and deploy advanced transformer models (BERT, GPT) for NLP tasks',
                'Implement GANs, reinforcement learning, and advanced computer vision models',
                'Optimize and quantize models for production deployment',
                'Scale deep learning training across distributed systems'
              ]
            },
            {
              id: 24,
              title: 'LLMs',
              duration: '3 Months',
              description: 'Advanced LLM techniques for production deployment and enterprise applications.',
              topics: [
                'LLM Finetuning (Full Finetuning, LoRA/QLoRA, Adapter-based Training, Instruction Tuning, RLAIF/RLHF Basics, Training Pipelines, Dataset Cleaning, Evaluation)',
                'LLM Agents (Planning, Tool Use, Memory, Feedback Loops, LangChain, LlamaIndex, CrewAI, AutoGen, Multi-agent Workflows, Expert Agents, Supervisor-worker Pattern)',
                'Advanced RAG & Hybrid RAG (Multi-vector RAG, Cross-encoder Rerankers, Hybrid Search - Keyword + Semantic, Knowledge Graph + RAG, RAGAS, TruLens, DeepEval, Hallucination Control)',
                'Deployment & Monitoring (CPU/GPU/Multi-GPU Deployment, Cloud - AWS/Azure/GCP, vLLM, TGI, llama.cpp, FastAPI-based Serving, LangSmith, OpenTelemetry, Latency, Token Throughput, Cost Monitoring)',
                'Benchmarking LLMs (MMLU, MT Bench, HELM, BigBench, Custom Task Benchmarking, Human vs Automated Evaluation, Leaderboards - HuggingFace, LMSys, ArenaHard)'
              ],
              expectedOutcomes: [
                'Fine-tune LLMs using advanced techniques (LoRA, QLoRA, RLHF) for custom applications',
                'Build sophisticated LLM agents with planning, tool use, and multi-agent workflows',
                'Implement production-ready RAG systems with advanced retrieval and evaluation',
                'Deploy and monitor LLMs at scale with optimal performance and cost efficiency'
              ]
            },
            {
              id: 23,
              title: 'AI Production Systems',
              duration: '2.5 Months',
              description: 'Deploy and maintain AI systems in production environments.',
              topics: [
                'Model Serving', 'A/B Testing for ML', 'Model Monitoring', 'Feature Stores',
                'MLOps Pipelines', 'Kubeflow', 'Model Versioning', 'Production Best Practices'
              ],
              expectedOutcomes: [
                'Deploy and serve ML models in production with high availability',
                'Implement MLOps pipelines with Kubeflow and CI/CD',
                'Monitor models, manage feature stores, and conduct A/B testing',
                'Maintain production ML systems with versioning and governance'
              ]
            }
          ]
        },
        {
          id: 'iot',
          title: 'IoT',
          courses: [
            {
              id: 24,
              title: 'IoT Architecture & Design',
              duration: '3 Months',
              description: 'Design and implement enterprise-grade IoT solutions.',
              topics: [
                'IoT Architecture Patterns', 'Edge AI & ML', 'Digital Twins', 'IoT Analytics Platforms',
                'Industrial IoT (IIoT)', 'Smart City Solutions', 'IoT Security Architecture',
                'Scalability & Performance', 'IoT Standards & Compliance'
              ],
              expectedOutcomes: [
                'Design enterprise IoT architectures with edge AI and digital twins',
                'Build scalable Industrial IoT and Smart City solutions',
                'Implement comprehensive IoT security architectures',
                'Ensure compliance with IoT standards and regulations'
              ]
            },
            {
              id: 25,
              title: 'IoT Project Implementation',
              duration: '2.5 Months',
              description: 'End-to-end IoT project development and deployment.',
              topics: [
                'Project Planning & Architecture', 'Hardware Selection', 'Firmware Development',
                'Cloud Integration', 'Data Analytics & Visualization', 'System Integration',
                'Testing & Validation', 'Deployment & Maintenance'
              ],
              expectedOutcomes: [
                'Lead end-to-end IoT project implementation from planning to deployment',
                'Select optimal hardware and develop custom firmware solutions',
                'Integrate IoT systems with cloud platforms and analytics',
                'Manage IoT project lifecycle with testing, validation, and maintenance'
              ]
            }
          ]
        },
        {
          id: 'cybersecurity',
          title: 'Cybersecurity',
          courses: [
            {
              id: 26,
              title: 'Advanced Security Operations',
              duration: '3 Months',
              description: 'Master security operations, incident response, and threat intelligence.',
              topics: [
                'Security Operations Center (SOC)', 'Incident Response', 'Threat Hunting',
                'Security Information and Event Management (SIEM)', 'Threat Intelligence',
                'Forensics & Investigation', 'Malware Analysis', 'Security Orchestration'
              ],
              expectedOutcomes: [
                'Lead SOC operations and manage security incidents effectively',
                'Conduct threat hunting and intelligence analysis',
                'Perform digital forensics and malware analysis',
                'Orchestrate security operations with automation and SIEM tools'
              ]
            },
            {
              id: 27,
              title: 'Security Architecture',
              duration: '2.5 Months',
              description: 'Design and implement comprehensive security architectures.',
              topics: [
                'Security Architecture Design', 'Zero Trust Architecture', 'Identity & Access Management',
                'Security Compliance (ISO 27001, NIST)', 'Risk Management', 'Security Auditing',
                'Cloud Security Architecture', 'DevSecOps'
              ],
              expectedOutcomes: [
                'Design enterprise security architectures with Zero Trust principles',
                'Implement comprehensive IAM and compliance frameworks (ISO 27001, NIST)',
                'Build cloud security architectures and DevSecOps pipelines',
                'Conduct security audits and risk management assessments'
              ]
            }
          ]
        },
        {
          id: 'web-mobile',
          title: 'Web and Mobile Development',
          courses: [
            {
              id: 28,
              title: 'Enterprise Web Applications',
              duration: '3 Months',
              description: 'Build scalable, enterprise-grade web applications.',
              topics: [
                'Microservices Architecture', 'API Gateway', 'Service Mesh', 'Distributed Systems',
                'Event-Driven Architecture', 'Caching Strategies', 'Load Balancing', 'Database Sharding',
                'Performance Optimization', 'Scalability Patterns'
              ],
              expectedOutcomes: [
                'Design and build enterprise-scale web applications with microservices',
                'Implement distributed systems with API gateways and service mesh',
                'Optimize performance with caching, load balancing, and database sharding',
                'Apply scalability patterns for high-traffic applications'
              ]
            },
            {
              id: 29,
              title: 'Backend Development',
              duration: '3 Months',
              description: 'Design and implement enterprise-level backend systems and architectures.',
              topics: [
                'System Design & Architecture', 'Distributed Systems', 'High Availability & Fault Tolerance',
                'Database Scaling & Replication', 'Message Brokers & Event Streaming', 'Container Orchestration (Kubernetes)',
                'Service Mesh (Istio)', 'Observability (Monitoring, Logging, Tracing)', 'Performance Engineering',
                'Backend Security Best Practices'
              ],
              expectedOutcomes: [
                'Design enterprise backend architectures with high availability and fault tolerance',
                'Implement distributed systems with Kubernetes and service mesh',
                'Build observability systems with monitoring, logging, and tracing',
                'Optimize backend performance and implement security best practices'
              ]
            },
            {
              id: 30,
              title: 'Native Mobile Development',
              duration: '2.5 Months',
              description: 'Develop high-performance native mobile applications.',
              topics: [
                'iOS Development (Swift)', 'Android Development (Kotlin)', 'Native Performance',
                'Platform-Specific Features', 'App Architecture (MVVM, Clean Architecture)',
                'Testing & QA', 'App Store Deployment', 'Performance Tuning'
              ],
              expectedOutcomes: [
                'Build high-performance native iOS and Android applications',
                'Implement clean architecture patterns (MVVM) for maintainable code',
                'Optimize mobile app performance and leverage platform-specific features',
                'Deploy apps to app stores with comprehensive testing and QA'
              ]
            }
          ]
        },
        {
          id: 'data-engineering',
          title: 'Data Engineering',
          courses: [
            {
              id: 31,
              title: 'Advanced Data Engineering',
              duration: '3 Months',
              description: 'Build large-scale data engineering solutions and data platforms.',
              topics: [
                'Data Lake Architecture', 'Data Mesh', 'Delta Lake', 'Data Cataloging',
                'Data Governance', 'Data Quality Frameworks', 'Advanced ETL Patterns',
                'Data Warehouse Modernization', 'Cloud Data Platforms (Snowflake, BigQuery)'
              ],
              expectedOutcomes: [
                'Design and implement data lake and data mesh architectures',
                'Build modern data platforms with Delta Lake and cloud data warehouses',
                'Implement data governance, cataloging, and quality frameworks',
                'Modernize legacy data warehouses to cloud platforms'
              ]
            },
            {
              id: 32,
              title: 'Real-Time Data Systems',
              duration: '2.5 Months',
              description: 'Design and implement real-time data processing systems.',
              topics: [
                'Real-Time Analytics', 'Lambda & Kappa Architectures', 'Event Streaming',
                'Change Data Capture (CDC)', 'Real-Time Dashboards', 'Streaming Analytics',
                'Data Pipeline Optimization', 'Monitoring & Observability'
              ],
              expectedOutcomes: [
                'Build real-time data processing systems with Lambda and Kappa architectures',
                'Implement event streaming and change data capture (CDC)',
                'Create real-time analytics dashboards and streaming analytics',
                'Optimize data pipelines with monitoring and observability'
              ]
            }
          ]
        },
        {
          id: 'executive-leadership',
          title: 'Executive & Leadership Skills',
          courses: [
            {
              id: 36,
              title: 'Top Executives (CXOs & Senior Leaders)',
              duration: '6 Months',
              description: 'Elevate your leadership capabilities with our premium coaching program designed exclusively for executives and senior leaders seeking transformational growth.',
              topics: [
                'Strategic Communication', 'Inter-Cultural Leadership', 'Vision & Narrative Building',
                'Crisis Communication', 'Executive Presence & Influence', 'Leadership in Transformation'
              ],
              expectedOutcomes: [
                'Lead with authority and global perspective',
                'Inspire large-scale transformation and innovation',
                'Build a leadership legacy that aligns with business growth'
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

  // Highlight matching text in search results
  const highlightText = (text: string, query: string): React.ReactNode => {
    if (!query.trim()) {
      return text;
    }

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) => {
          if (part.toLowerCase() === query.toLowerCase()) {
            return (
              <mark
                key={index}
                className="bg-accent-500 text-white px-1 rounded font-semibold"
              >
                {part}
              </mark>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </>
    );
  };

  // Filter courses based on search query (minimum 3 characters required)
  const filterCourses = (categories: typeof curriculumData.beginner.categories): typeof curriculumData.beginner.categories => {
    if (!searchQuery.trim() || searchQuery.trim().length < 3) {
      return categories;
    }

    const query = searchQuery.toLowerCase().trim();
    
    return categories.map((category) => ({
      ...category,
      courses: category.courses.filter((course) => {
        // Search in course title
        if (course.title.toLowerCase().includes(query)) {
          return true;
        }
        // Search in course description
        if (course.description?.toLowerCase().includes(query)) {
          return true;
        }
        // Search in course topics
        if (course.topics?.some((topic: string) => topic.toLowerCase().includes(query))) {
          return true;
        }
        // Search in expected outcomes
        if ((course as any).expectedOutcomes?.some((outcome: string) => outcome.toLowerCase().includes(query))) {
          return true;
        }
        return false;
      })
    })).filter((category) => category.courses.length > 0) as typeof curriculumData.beginner.categories; // Only show categories that have matching courses
  };

  const currentCategories = filterCourses(curriculumData[selectedLevel].categories);

  // Clear search when level changes
  useEffect(() => {
    setSearchQuery('');
  }, [selectedLevel]);

  // Auto-scroll to first matching course when search results are found (minimum 3 characters required)
  useEffect(() => {
    if (searchQuery.trim() && searchQuery.trim().length >= 3) {
      // Calculate total number of matching courses
      const totalCourses = currentCategories.reduce((total: number, cat) => total + cat.courses.length, 0);
      
      // Only scroll if there are actual matching courses
      if (totalCourses > 0) {
        // Small delay to ensure DOM is updated with filtered results
        setTimeout(() => {
          if (firstCourseRef.current) {
            firstCourseRef.current.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          } else if (curriculumSectionRef.current) {
            // Fallback to curriculum section if course ref not available
            curriculumSectionRef.current.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          }
        }, 150);
      }
    }
  }, [searchQuery, currentCategories]);

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
      <LiveDemoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onPrivacyPolicyClick={() => setIsPrivacyPolicyOpen(true)}
        onTermsOfServiceClick={() => setIsTermsOfServiceOpen(true)}
      />
      <ServiceModal 
        isOpen={isServiceModalOpen} 
        onClose={() => setIsServiceModalOpen(false)} 
        service={selectedService}
      />
      <PrivacyPolicy
        isOpen={isPrivacyPolicyOpen}
        onClose={() => setIsPrivacyPolicyOpen(false)}
      />
      <TermsOfService
        isOpen={isTermsOfServiceOpen}
        onClose={() => setIsTermsOfServiceOpen(false)}
      />

      {/* Hero Section with Form */}
      <section id="home" className="relative min-h-[500px] sm:min-h-[550px] flex flex-col lg:flex-row items-start overflow-visible bg-gradient-to-br from-dark-800 via-dark-700 to-dark-800 pb-24 lg:pb-24">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ minHeight: '100%' }}
        >
          <source src="/resources/hero_video.mp4" type="video/mp4" />
          {/* Fallback gradient if video fails to load */}
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-dark-800 bg-opacity-90 z-0"></div>
        
        {/* Left side - Dark background with program information */}
        <div className="w-full lg:w-1/2 text-white pt-8 pb-4 lg:pt-6 lg:pb-12 px-4 sm:px-6 lg:px-16 flex items-start relative z-10">
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
                Executive and Leadership Skills
              </li>
            </ul>

            {/* Next Batch Information */}
            {/*<div className="mt-8">
              <p className="text-sm">
                Next batch starts in <span className="text-yellow-400 font-bold">DECEMBER</span>
              </p>
            </div>*/}
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
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setIsTermsOfServiceOpen(true);
                }}
                className="text-accent-600 hover:underline cursor-pointer"
              >
                Terms
              </a>{' '}
              and{' '}
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setIsPrivacyPolicyOpen(true);
                }}
                className="text-accent-600 hover:underline cursor-pointer"
              >
                Privacy Policy
              </a>.
            </p>
            </form>
          </div>
        </div>

        {/* Program Details Card - Top half in Hero, bottom half outside on mobile */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[60%] lg:translate-y-1/2 w-full lg:w-[60%] z-10 px-4 sm:px-6 lg:px-4">
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
                  <p className="text-black-500 font-medium text-sm font-montserrat">Students & Working Professionals</p>
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
      <section id="programs" className="pt-40 sm:pt-44 md:pt-48 lg:pt-32 pb-12 sm:pb-16 md:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3 sm:mb-4 font-sans px-4">
              Kachchapi Programs & Services
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Choose the Kachchapi program that fits your career goals
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
                  onClick={() => {
                    setSelectedService(program);
                    setIsServiceModalOpen(true);
                  }}
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
      <section id="curriculum" ref={curriculumSectionRef} className="py-12 sm:py-16 md:py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-wide mb-2 font-sans">AI SKILLS & SOFTWARE DEVELOPMENT CURRICULUM</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4 font-sans px-4">
              Industry-Ready AI Training Curriculum: Master Machine Learning, Gen AI & Software Development
            </h2>
          </div>

          {/* Level Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedLevel === level
                    ? 'bg-accent-500 border-accent-500 text-white'
                    : 'bg-dark-800 border-dark-700 text-white hover:border-dark-600'
                }`}
              >
                <div className="flex items-center justify-center mb-2">
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
                        style={{ height: `${(idx + 1) * 6}px` }}
                      />
                    ))}
                  </div>
                </div>
                <h3 className="text-base font-normal capitalize">{level}</h3>
              </button>
            ))}
          </div>

          {/* Search Input Bar */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search courses by name, description, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-dark-800 border-2 border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500 focus:ring-opacity-50 transition-all font-sans text-sm sm:text-base"
              />
              <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-10 sm:right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
            {searchQuery && searchQuery.trim().length >= 3 && (
              <p className="text-center text-gray-400 text-sm mt-3 font-sans">
                {currentCategories.reduce((total: number, cat) => total + cat.courses.length, 0)} course(s) found
              </p>
            )}
            {searchQuery && searchQuery.trim().length > 0 && searchQuery.trim().length < 3 && (
              <p className="text-center text-gray-400 text-sm mt-3 font-sans">
                Please enter at least 3 characters to search
              </p>
            )}
          </div>

          {/* Important Note */}
          <div className="mb-6 sm:mb-8 bg-accent-500 bg-opacity-10 border-l-4 border-accent-500 rounded-lg p-4 sm:p-5">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3 mt-0.5">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-sm sm:text-base mb-1 font-sans">Note</h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-sans">
                  Each course in this curriculum will be followed by a <span className="font-semibold text-accent-400">hands-on project</span> based on <span className="font-semibold text-accent-400">actual industry-related use cases</span>. This project-based approach ensures you gain practical, real-world experience and are ready to apply your skills in professional environments.
                </p>
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div className="mb-6 sm:mb-8 space-y-4 sm:space-y-6">
            {currentCategories.map((category, categoryIndex) => (
              <div key={category.id} className="mb-4 sm:mb-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <span className="text-white text-xl sm:text-2xl mr-2 sm:mr-3">✦</span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white font-sans">
                    {category.title}
                  </h3>
                </div>

                {/* Course Cards for this Category */}
                <div className="space-y-2 sm:space-y-3">
                  {category.courses.map((course, courseIndex) => {
                    // Check if this is the first course across all categories
                    const isFirstCourse = categoryIndex === 0 && courseIndex === 0;
                    return (
                    <div
                      key={course.id}
                        ref={isFirstCourse ? firstCourseRef : null}
                      className="bg-dark-800 border border-dark-700 rounded-lg overflow-hidden"
                    >
                      {/* Course Header */}
                      <div
                        className="p-3 sm:p-4 cursor-pointer flex items-center justify-between hover:bg-dark-700 transition-colors"
                        onClick={() => toggleCourseExpansion(course.id)}
                      >
                        <div className="flex items-center flex-1 min-w-0">
                          <span className="text-white text-base sm:text-lg mr-2 sm:mr-3 flex-shrink-0">&lt; /&gt;</span>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm sm:text-base font-bold text-white font-sans mb-0.5 break-words">
                              {searchQuery && searchQuery.trim().length >= 3 ? highlightText(course.title, searchQuery) : course.title}
                            </h4>
                            {course.description && (
                              <p className="text-gray-400 text-xs font-sans line-clamp-2 mt-0.5">
                                {searchQuery && searchQuery.trim().length >= 3 ? highlightText(course.description, searchQuery) : course.description}
                              </p>
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
                      {expandedCourses.includes(course.id) && (course.topics || (course as any).expectedOutcomes) && (
                        <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0 border-t border-dark-700">
                          {course.topics && (
                            <div className="mt-2 sm:mt-3">
                              <p className="text-gray-400 text-xs sm:text-sm mb-2 font-sans">Topics covered:</p>
                            <div className="flex flex-wrap gap-2">
                              {course.topics.map((topic: string, idx: number) => (
                                <span
                                  key={idx}
                                    className="bg-dark-700 border border-dark-600 text-white text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded font-sans"
                                >
                                    {searchQuery && searchQuery.trim().length >= 3 ? highlightText(topic, searchQuery) : topic}
                                </span>
                              ))}
                            </div>
                          </div>
                          )}
                          {(course as any).expectedOutcomes && (
                            <div className="mt-3 sm:mt-4">
                              <p className="text-gray-400 text-xs sm:text-sm mb-2 font-sans">Expected Outcomes:</p>
                              <ul className="list-disc list-inside space-y-1.5">
                                {(course as any).expectedOutcomes.map((outcome: string, idx: number) => (
                                  <li
                                    key={idx}
                                    className="text-gray-300 text-xs sm:text-sm font-sans"
                                  >
                                    {searchQuery && searchQuery.trim().length >= 3 ? highlightText(outcome, searchQuery) : outcome}
                                  </li>
                                ))}
                              </ul>
                        </div>
                      )}
                    </div>
                      )}
                      </div>
                    );
                  })}
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

      <Footer 
        onServiceClick={(serviceTitle) => {
          const service = programs.find(p => p.title === serviceTitle);
          if (service) {
            setSelectedService(service);
            setIsServiceModalOpen(true);
          }
        }}
        onPrivacyPolicyClick={() => setIsPrivacyPolicyOpen(true)}
        onTermsOfServiceClick={() => setIsTermsOfServiceOpen(true)}
      />
    </div>
  );
};

export default SinglePageLayout;

