import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import emailjs from '@emailjs/browser';

// Importar las imágenes
import heroImage from '../assets/images/hero.png';
import developerWorking from '../assets/images/yo.png';
import teamPhoto from '../assets/images/yo.png';
import project1 from '../assets/images/chat.jpeg';
import project2 from '../assets/images/Cine.png';
import project3 from '../assets/images/fibra.png';
import project4 from '../assets/images/tareas.png';

import { 
  Code, 
  Globe, 
  Smartphone, 
  FileText, 
  Video, 
  Shield, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Menu, 
  X,
  Mail,
  MessageCircle,
  Award,
  Users,
  Clock,
  Zap
} from 'lucide-react';

const SolucionesDigitalesBaio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    from_name: '',
    user_email: '',
    service_type: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  
  const { scrollYProgress } = useScroll();
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -100]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus('');

    try {
      const templateParams = {
        ...formData,
        request_date: new Date().toLocaleString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const result = await emailjs.send(
        'service_owp7dui',
        'template_723vw98',
        templateParams,
        'wBi-wq0LLBdD8nPXN'
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({
          from_name: '',
          user_email: '',
          service_type: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const services = [
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Desarrollo Web",
      description: "Páginas web modernas y responsivas para tu negocio. Optimizadas para SEO y conversiones.",
      features: ["Diseño Responsive", "SEO Optimizado", "Carga Rápida", "Panel Admin"]
    },
    {
      icon: <Code className="w-12 h-12" />,
      title: "Sistemas Personalizados",
      description: "Desarrollo de software a medida para automatizar tus procesos empresariales.",
      features: ["Gestión Inventario", "APIs", "Base de Datos"]
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: "Apps Móviles",
      description: "Aplicaciones móviles nativas e híbridas para Android.",
      features: ["UI/UX Moderno", "Notificaciones"]
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: "Documentos Académicos",
      description: "Redacción de ensayos, informes, Corrección de tesis y trabajos académicos profesionales.",
      features: ["APA/IEEE", "Investigación", "Referencias", "Originalidad"]
    },
    {
      icon: <Video className="w-12 h-12" />,
      title: "Edición de Videos",
      description: "Post-producción profesional para contenido corporativo y educativo.",
      features: ["Motion Graphics", "Color Grading", "Audio", "Efectos VFX"]
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Control de Plagio",
      description: "Verificación de originalidad con Compilatio para tesis y artículos académicos.",
      features: ["Compilatio", "Reportes", "Correcciones", "Certificados"]
    }
  ];

  const stats = [
    { number: "50+", label: "Proyectos Completados", icon: <Award /> },
    { number: "100%", label: "Clientes Satisfechos", icon: <Users /> },
    { number: "24/7", label: "Soporte Técnico", icon: <Clock /> },
    { number: "48h", label: "Entrega Rápida", icon: <Zap /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modal para imágenes */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-full object-contain rounded-xl shadow-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-xl">
              <h3 className="text-white font-bold text-xl mb-2">{selectedImage.title}</h3>
              <p className="text-gray-200">{selectedImage.desc}</p>
              {selectedImage.tech && (
                <span className="inline-block mt-2 px-3 py-1 bg-blue-600/80 text-white text-sm rounded-full">
                  {selectedImage.tech}
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Header */}
      <motion.header 
        style={{ y: headerY }}
        className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  DigitalSolutions
                </h1>
                <p className="text-xs text-gray-600">Baio</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {['Inicio', 'Servicios', 'Portafolio', 'Nosotros', 'Contacto'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-gray-200"
            >
              {['Inicio', 'Servicios', 'Portafolio', 'Nosotros', 'Contacto'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-3 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </motion.nav>
          )}
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="inicio" className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                <span className="text-blue-600">
                  Soluciones Digitales
                </span>
                <br />
                <span className="text-gray-900">Profesionales</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Transformamos tus ideas en realidad digital. Desarrollo web, sistemas personalizados, 
                documentos académicos y más. Tu éxito es nuestra prioridad.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <a
                  href="https://wa.me/593967187625"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contactar Ahora
                </a>
                <button className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
                  Ver Portafolio
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <div className="relative bg-gray-900 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-full h-64 rounded-xl overflow-hidden">
                    <img 
                      src={heroImage || developerWorking} 
                      alt="Desarrollador profesional trabajando"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center" style={{display: 'none'}}>
                      <div className="text-center">
                        <Code className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">Imagen de Hero</p>
                        <p className="text-sm text-gray-500">Desarrollador trabajando</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg"
                >
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                </motion.div>
                
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg"
                >
                  <Star className="w-6 h-6 text-amber-500" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 text-blue-600 rounded-xl mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestros <span className="text-blue-600">Servicios</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos soluciones integrales para impulsar tu negocio al siguiente nivel
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="text-blue-600 mb-6">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <motion.button 
                  whileHover={{ x: 5 }}
                  className="mt-6 inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Más información
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portafolio" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Nuestro <span className="text-blue-400">Portafolio</span>
            </h2>
            <p className="text-xl text-gray-300">Algunos de nuestros proyectos para vista previa </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 1, image: project1, title: "Aplicación Web de Mensajería", desc: "Sistema de chat en línea con registro de usuarios.", tech: "React, Node.js, Socket.io" },
              { id: 2, image: project2, title: "Gestión de Proyectos", desc: "Planificación y asesoría para el desarrollo de un sistema de cines utilizando Scrum y la herramienta Trello.", tech: "Scrum, Trello, Metodologías Ágiles" },
              { id: 3, image: project3, title: "Sistema de Gestión para la instalación de Fibra Óptica", desc: "Sistema para gestionar proyectos de instalación de fibra óptica, que calcula automáticamente costos de materiales, gestiona mantenimiento y permite integrar mapas .mxd y .shp para optimizar la planificación", tech: "Python, GIS, PostgreSQL" },
              { id: 4, image: project4, title: "Servicios Académicos de Pregrado y Posgrado", desc: "Corrección de tesis, informes de plagio con Compilatio, redacción de artículos y asesoría en normas APA y Vancouver.", tech: "Compilatio, APA, Vancouver" }
            ].map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(project)}
              >
                <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center" style={{display: 'none'}}>
                      <div className="text-center">
                        <Globe className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                        <p className="text-white font-medium">Proyecto {project.id}</p>
                        <p className="text-sm text-gray-300">Click para ampliar</p>
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-white text-sm font-medium bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                        Click para ampliar
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-xs text-blue-400 font-medium">{project.tech}</span>
                    </div>
                    <h3 className="font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{project.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

        {/* About Section */}
      <section id="nosotros" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={teamPhoto} 
                  alt="Equipo de DigitalSolutions BAIO"
                  className="w-full h-80 object-cover"
                  onError={(e) => {
                    // Fallback si la imagen no carga
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback placeholder */}
                <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center" style={{display: 'none'}}>
                  <div className="text-center">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Foto del Equipo</p>
                    <p className="text-sm text-gray-500">Imagen profesional</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Sobre <span className="text-blue-600">Nosotros</span>
              </h2>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Soy un ingeniero en software apasionado por crear soluciones digitales que 
                transforman negocios. Con experiencia en desarrollo web, sistemas personalizados 
                y servicios académicos, mi objetivo es ayudarte a alcanzar el éxito digital.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Experiencia Comprobada</h4>
                    <p className="text-gray-600">Más de 50 proyectos exitosos entregados</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Tecnologías Modernas</h4>
                    <p className="text-gray-600">React, Node.js, Python, y las últimas herramientas</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Soporte Continuo</h4>
                    <p className="text-gray-600">Mantenimiento y actualizaciones incluidas</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Listo para <span className="text-blue-600">Comenzar?</span>
            </h2>
            <p className="text-xl text-gray-600">Contacta conmigo y hagamos realidad tu proyecto</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">WhatsApp</h3>
                  <p className="text-gray-600 mb-2">Respuesta inmediata las 24/7</p>
                  <a
                    href="https://wa.me/593967187625"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                  >
                    +593 96 718 7625
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600 mb-2">Para cotizaciones y consultas formales</p>
                  
                </div>
              </div>

              <div className="bg-gray-100 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">¿Por qué elegirme?</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    Entrega puntual garantizada
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    Precios competitivos
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    Soporte post-entrega incluido
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    100% de satisfacción del cliente
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-6">Solicitar Cotización</h3>
              
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-500 text-white p-4 rounded-lg mb-6"
                >
                  ✅ ¡Solicitud enviada correctamente! Te contactaré pronto.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500 text-white p-4 rounded-lg mb-6"
                >
                  ❌ Error al enviar. Inténtalo de nuevo o contáctame por WhatsApp.
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre Completo</label>
                  <input
                    type="text"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="Tu nombre"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="tu@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Tipo de Servicio</label>
                  <select 
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="" className="text-gray-800">Selecciona un servicio</option>
                    <option value="Desarrollo Web" className="text-gray-800">Desarrollo Web</option>
                    <option value="Sistema Personalizado" className="text-gray-800">Sistema Personalizado</option>
                    <option value="App Móvil" className="text-gray-800">App Móvil</option>
                    <option value="Documento Académico" className="text-gray-800">Documento Académico</option>
                    <option value="Edición de Video" className="text-gray-800">Edición de Video</option>
                    <option value="Control de Plagio" className="text-gray-800">Control de Plagio</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Describe tu proyecto</label>
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
                    placeholder="Cuéntame sobre tu proyecto..."
                  ></textarea>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    'Enviar Solicitud'
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

           {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">DigitalSolutions BAIO</h3>
                  <p className="text-gray-400 text-sm">Transformando ideas en realidad</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Especialistas en desarrollo web, sistemas personalizados y servicios académicos. 
                Tu socio tecnológico de confianza para el crecimiento digital.
              </p>
              
              <div className="flex space-x-4">
                <a
                  href="https://wa.me/593967187625"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center hover:bg-emerald-700 transition-colors hover:shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a
                  href="mailto:bryanadrian38@gmail.com"
                  className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors hover:shadow-lg"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Desarrollo Web</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sistemas Personalizados</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Apps Móviles</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentos Académicos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Edición de Videos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Control de Plagio</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>WhatsApp: +593 96 718 7625</li>
                <li>Ubicación: Ecuador, Quito</li>
                <li>Horario: 24/7 Disponible</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 DigitalSolutions BAIO. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SolucionesDigitalesBaio;