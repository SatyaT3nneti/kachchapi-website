import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRobot, 
  faChartLine, 
  faEye, 
  faLanguage, 
  faThumbsUp, 
  faCogs,
  faCheckCircle,
  faDownload,
  faRocket,
  faShield,
  faGlobe,
  faCode,
  faLeaf,
  faBrain,
  faHeartbeat,
  faComments
} from '@fortawesome/free-solid-svg-icons';

const AIMLProjects: React.FC = () => {
  const foundationalProjects = [
    {
      title: 'Intelligent Data Scraping Agent',
      description: 'Build an adaptive scraping agent that intelligently navigates different website structures and respects scraping policies.',
      technologies: ['Python', 'Selenium', 'Beautiful Soup', 'Scrapy', 'Open Source LLM'],
      duration: '3 months',
      difficulty: 'Foundational',
      icon: faRobot,
      category: 'Data Collection'
    },
    {
      title: 'AI-Powered Interview Chatbot',
      description: 'Create a conversational AI interviewer with voice integration and emotion detection capabilities.',
      technologies: ['OpenAI API', 'Whisper', 'Text-to-Speech', 'Web Framework'],
      duration: '3 months',
      difficulty: 'Foundational',
      icon: faLanguage,
      category: 'Conversational AI'
    },
    {
      title: 'Multilingual Spam Classifier',
      description: 'Develop spam detection for Indian languages handling code-mixing and transliteration challenges.',
      technologies: ['IndicBERT', 'mBERT', 'Multilingual Datasets', 'Cross-lingual Transfer'],
      duration: '4 months',
      difficulty: 'Foundational',
      icon: faShield,
      category: 'NLP & Multilingual'
    },
    {
      title: 'Smart Attendance System',
      description: 'Build face recognition system for automated attendance tracking with group photo processing.',
      technologies: ['OpenCV', 'Face Recognition', 'Deep Learning', 'GPU Training'],
      duration: '4 months',
      difficulty: 'Foundational',
      icon: faEye,
      category: 'Computer Vision'
    },
    {
      title: 'Wikipedia Knowledge Graph',
      description: 'Extract Wikipedia structure into queryable knowledge graph with RAG integration.',
      technologies: ['Neo4j', 'Graph Database', 'RAG Pipeline', 'Semantic Search'],
      duration: '4 months',
      difficulty: 'Foundational',
      icon: faGlobe,
      category: 'Knowledge Graphs'
    },
    {
      title: 'StackOverflow Solution Assistant',
      description: 'Create intelligent assistant that finds and explains solutions from multiple technical sources.',
      technologies: ['Knowledge Graph', 'Multi-source Search', 'Code Analysis', 'Documentation Integration'],
      duration: '3 months',
      difficulty: 'Foundational',
      icon: faCode,
      category: 'Developer Tools'
    },
    {
      title: 'Plant Disease Classification',
      description: 'Build computer vision system for identifying plant diseases from leaf images across multiple crops.',
      technologies: ['PyTorch/TensorFlow', 'Data Augmentation', 'Mobile Deployment', 'Imbalanced Classification'],
      duration: '4 months',
      difficulty: 'Foundational',
      icon: faLeaf,
      category: 'Agricultural AI'
    }
  ];

  const advancedProjects = [
    {
      title: 'Multi-Agent Reasoning System',
      description: 'Build collaborative AI agents for investigative intelligence with explainable evidence-backed reasoning.',
      technologies: ['LangChain/CrewAI', 'Qwen2.5/GPT-4', 'Milvus/Weaviate', 'Microservices'],
      duration: '4 months',
      difficulty: 'Advanced',
      icon: faBrain,
      category: 'Advanced AI Systems'
    },
    {
      title: 'Generative Recommendation Engine',
      description: 'Create dynamic recommendation system that understands user intent and explains reasoning in natural language.',
      technologies: ['SentenceTransformers', 'Llama-3/Qwen2.5', 'Milvus', 'Elasticsearch'],
      duration: '4 months',
      difficulty: 'Advanced',
      icon: faThumbsUp,
      category: 'Recommendation Systems'
    },
    {
      title: 'Clinical Knowledge Graph',
      description: 'Build comprehensive medical knowledge graph linking diseases, treatments, and drug interactions with LLM querying.',
      technologies: ['Neo4j', 'BioBERT/PubMedBERT', 'UMLS', 'Clinical Datasets'],
      duration: '4 months',
      difficulty: 'Advanced',
      icon: faHeartbeat,
      category: 'Healthcare AI'
    },
    {
      title: 'Multilingual Emotion-Aware AI',
      description: 'Develop conversational AI that understands emotional context across multiple languages with voice integration.',
      technologies: ['Whisper', 'wav2vec', 'Llama-3/Qwen2.5', 'Real-time Processing'],
      duration: '4 months',
      difficulty: 'Advanced',
      icon: faComments,
      category: 'Emotion AI'
    },
    {
      title: 'Low-Resource Learning Framework',
      description: 'Develop techniques to improve AI performance for Indian languages using smart data collection strategies.',
      technologies: ['IndicBERT/mT5', 'Active Learning', 'Weak Supervision', 'Multi-GPU Training'],
      duration: '4 months',
      difficulty: 'Advanced',
      icon: faGlobe,
      category: 'Multilingual AI'
    }
  ];

  const learningOutcomes = [
    'Master advanced machine learning algorithms and frameworks',
    'Build production-ready AI applications with proper deployment strategies',
    'Understand data preprocessing, feature engineering, and model optimization',
    'Implement MLOps practices for scalable AI solutions',
    'Work with real-world datasets and industry-standard tools',
    'Develop skills in model evaluation, validation, and monitoring'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-no-repeat text-white py-20 overflow-hidden" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'}}>
        <div className="absolute inset-0 bg-dark-800 bg-opacity-75"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">AI/ML Innovation Projects</h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            Dive deep into artificial intelligence and machine learning through hands-on projects 
            that solve real-world problems and prepare you for cutting-edge careers in AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105">
              Start Your Project
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-dark-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105">
              View All Projects
            </button>
          </div>
        </div>
      </section>

      {/* Project Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">AI/ML Project Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive range of foundational and advanced AI/ML projects designed 
              to build expertise in cutting-edge technologies and real-world applications.
            </p>
          </div>

          {/* Foundational Projects Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-dark-800 mb-4">Foundational AI/ML Projects</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Build fundamental skills with projects designed for students building their AI/ML foundation. 
                Each project introduces core concepts while creating practical, deployable solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {foundationalProjects.map((project, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                      <FontAwesomeIcon icon={project.icon} className="text-white text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-dark-800 mb-3">{project.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{project.description}</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-semibold text-dark-800">{project.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Category:</span>
                      <span className="font-semibold text-dark-800">{project.category}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Difficulty:</span>
                      <span className="font-semibold px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        {project.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-primary-500 hover:bg-primary-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors">
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Projects Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-dark-800 mb-4">Advanced AI/ML Projects</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Tackle genuinely challenging problems with projects designed for experienced students. 
                Each represents real-world applications that companies are actively working on.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advancedProjects.map((project, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-red-600 rounded-2xl flex items-center justify-center mb-4">
                      <FontAwesomeIcon icon={project.icon} className="text-white text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-dark-800 mb-3">{project.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{project.description}</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-semibold text-dark-800">{project.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Category:</span>
                      <span className="font-semibold text-dark-800">{project.category}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Difficulty:</span>
                      <span className="font-semibold px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                        {project.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-primary-500 hover:bg-primary-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors">
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Reach Out Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-dark-800 mb-4">Want to Explore More Projects?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                We have an extensive catalog of AI/ML projects across various domains. 
                Contact us to discuss your specific interests and get a customized project roadmap.
              </p>
              <button 
                onClick={() => window.location.href = '/contact'}
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center mx-auto"
              >
                <FontAwesomeIcon icon={faRocket} className="mr-2" />
                Reach Out to Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-dark-800 mb-6">What You'll Learn</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our AI/ML projects provide comprehensive hands-on experience with industry-standard 
                tools and methodologies, preparing you for advanced roles in artificial intelligence.
              </p>
              <ul className="space-y-4">
                {learningOutcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <FontAwesomeIcon icon={faCheckCircle} className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-dark-800 mb-6">Ready to Start Your AI Journey?</h3>
              <p className="text-gray-600 mb-6">
                Join our Innovation Hub and work on cutting-edge AI/ML projects with industry mentors.
              </p>
              <div className="space-y-4">
                <button className="w-full bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                  <FontAwesomeIcon icon={faRocket} className="mr-2" />
                  Apply for Innovation Hub
                </button>
                <button className="w-full border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                  <FontAwesomeIcon icon={faDownload} className="mr-2" />
                  Download Project Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-dark-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Transform Ideas into AI Solutions</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join our Innovation Hub and work on real-world AI/ML projects that make a difference
          </p>
          <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            GET STARTED TODAY
          </button>
        </div>
      </section>
    </div>
  );
};

export default AIMLProjects;
