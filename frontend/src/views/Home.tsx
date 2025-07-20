import React, { useState } from "react";
import {
  HiHome,
  HiCreditCard,
  HiDocumentText,
  HiLightningBolt,
  HiShieldCheck,
  HiUsers,
  HiPhone,
  HiMail,
  HiLocationMarker,
  HiCheckCircle,
  HiMenu,
  HiX,
  HiEye,
  HiClock,
  HiBell,
} from "react-icons/hi";
import { HiWrench } from "react-icons/hi2";
import LoginModal from "../components/Modal/LoginModal";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleLoginModal = () => { setIsLoginModalOpen(!isLoginModalOpen); };

  const handleScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMenuOpen(false);
  };

  const ownerFeatures = [
    {
      icon: <HiEye className="w-6 h-6 text-sky-600" />,
      title: "Status de Pagamento",
      description:
        "Visualize em tempo real o status dos pagamentos de todos os seus inquilinos",
    },
    {
      icon: <HiCreditCard className="w-6 h-6 text-sky-600" />,
      title: "Pagamentos Online",
      description:
        "Vincule formas de pagamento e receba via PIX diretamente no app",
    },
    {
      icon: <HiClock className="w-6 h-6 text-sky-600" />,
      title: "Histórico Completo",
      description:
        "Acesse o histórico detalhado de pagamentos de cada inquilino",
    },
    {
      icon: <HiLightningBolt className="w-6 h-6 text-sky-600" />,
      title: "Controle de Utilidades",
      description:
        "Monitore água e luz, com transferência automática de valores",
    },
    {
      icon: <HiDocumentText className="w-6 h-6 text-sky-600" />,
      title: "Contratos Automáticos",
      description:
        "Gere e autentique contratos digitalmente com poucos cliques",
    },
    {
      icon: <HiShieldCheck className="w-6 h-6 text-sky-600" />,
      title: "Processos Legais",
      description:
        "Emita ordens de despejo e processos para pequenas causas automaticamente",
    },
  ];

  const tenantFeatures = [
    {
      icon: <HiDocumentText className="w-6 h-6 text-sky-600" />,
      title: "Contrato Digital",
      description: "Visualize seu contrato de aluguel a qualquer momento",
    },
    {
      icon: <HiCreditCard className="w-6 h-6 text-sky-600" />,
      title: "Pagamento Unificado",
      description: "Pague aluguel, água e luz em um só lugar, de forma simples",
    },
    {
      icon: <HiBell className="w-6 h-6 text-sky-600" />,
      title: "Notificações Inteligentes",
      description:
        "Receba lembretes de pagamento e outras informações importantes",
    },
    {
      icon: <HiWrench className="w-6 h-6 text-sky-600" />,
      title: "Solicitação de Manutenção",
      description:
        "Solicite reparos com fotos e descrição diretamente ao proprietário",
    },
  ];

  const benefits = [
    {
      icon: <HiCheckCircle className="w-8 h-8 text-green-500" />,
      title: "Economia de Tempo",
      description: "Automatize processos que hoje são feitos manualmente",
    },
    {
      icon: <HiShieldCheck className="w-8 h-8 text-green-500" />,
      title: "Segurança Jurídica",
      description: "Contratos autenticados e processos legais simplificados",
    },
    {
      icon: <HiUsers className="w-8 h-8 text-green-500" />,
      title: "Interface Simples",
      description:
        "Desenvolvido pensando na facilidade de uso para todas as idades",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <HiHome className="w-8 h-8 text-sky-600" />
              <span className="text-xl font-bold text-gray-900">DomusApp</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => handleScrollTo("inicio")}
                className="text-gray-700 hover:text-sky-600 transition-colors cursor-pointer"
              >
                Início
              </button>
              <button
                onClick={() => handleScrollTo("funcionalidades")}
                className="text-gray-700 hover:text-sky-600 transition-colors cursor-pointer"
              >
                Funcionalidades
              </button>
              <button
                onClick={() => handleScrollTo("beneficios")}
                className="text-gray-700 hover:text-sky-600 transition-colors cursor-pointer"
              >
                Benefícios
              </button>
              <button
                onClick={() => handleScrollTo("contato")}
                className="text-gray-700 hover:text-sky-600 transition-colors cursor-pointer"
              >
                Contato
              </button>
              <button className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors font-medium cursor-pointer" onClick={toggleLoginModal}>
                Fazer Login
              </button>
            </nav>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-sky-600 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
                <button
                  onClick={() => handleScrollTo("inicio")}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-sky-600"
                >
                  Início
                </button>
                <button
                  onClick={() => handleScrollTo("funcionalidades")}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-sky-600"
                >
                  Funcionalidades
                </button>
                <button
                  onClick={() => handleScrollTo("beneficios")}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-sky-600"
                >
                  Benefícios
                </button>
                <button
                  onClick={() => handleScrollTo("contato")}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-sky-600"
                >
                  Contato
                </button>
                <button className="w-full mt-2 bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition-colors font-medium" onClick={toggleLoginModal}>
                  Fazer Login
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <section id="inicio" className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Gerencie seus <span className="text-sky-600">Aluguéis</span>
              <br />
              com Simplicidade
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Centralize todos os processos de aluguel em um só lugar.
              Pagamentos, contratos, manutenção e muito mais, de forma simples e
              automática.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-sky-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-sky-700 transition-colors shadow-lg w-full sm:w-auto cursor-pointer">
                Começar Agora
              </button>
              <button className="border-2 border-sky-600 text-sky-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-sky-50 transition-colors w-full sm:w-auto cursor-pointer">
                Ver Demonstração
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="funcionalidades" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Funcionalidades Completas
            </h2>
            <p className="text-xl text-gray-600">
              Tudo que você precisa para gerenciar seus aluguéis de forma
              eficiente
            </p>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-8">
              Para Proprietários
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ownerFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    {feature.icon}
                    <h4 className="text-lg font-semibold text-gray-900 ml-3">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-8">
              Para Inquilinos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {tenantFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    {feature.icon}
                    <h4 className="text-lg font-semibold text-gray-900 ml-3">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="beneficios" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Por que Escolher o DomusApp?
            </h2>
            <p className="text-xl text-gray-600">
              Benefícios que fazem a diferença no seu dia a dia
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-sky-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Pronto para Simplificar seus Aluguéis?
          </h2>
          <p className="text-xl text-sky-100 mb-8">
            Junte-se aos proprietários e inquilinos que já descobriram a
            facilidade do DomusApp
          </p>
          <button className="bg-white text-sky-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg cursor-pointer">
            Começar Gratuitamente
          </button>
        </div>
      </section>

      <section id="contato" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Entre em Contato
            </h2>
            <p className="text-xl text-gray-600">
              Tem dúvidas? Estamos aqui para ajudar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <HiPhone className="w-8 h-8 text-sky-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Telefone
              </h3>
              <p className="text-gray-600">(44) 99712-6310</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <HiMail className="w-8 h-8 text-sky-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Email
              </h3>
              <p className="text-gray-600">antonybresolin1@gmail.com</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <HiLocationMarker className="w-8 h-8 text-sky-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Localização
              </h3>
              <p className="text-gray-600">Toledo, PR</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <HiHome className="w-6 h-6 text-sky-400" />
              <span className="text-lg font-bold">DomusApp</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2025 DomusApp. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>

     <LoginModal isOpen={isLoginModalOpen} onClose={toggleLoginModal} />
    </div>
  );
};

export default LandingPage;
