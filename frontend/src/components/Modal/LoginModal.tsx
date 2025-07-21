import React, { useState } from "react";
import {
  HiX,
  HiMail,
  HiLockClosed,
  HiUser,
  HiPhone,
  HiHome,
  HiEye,
  HiEyeOff,
  HiBadgeCheck,
  HiOfficeBuilding,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../services/UserService";
import { useAuth } from "../../hooks/useAuth";
import type { ModalProps, InputChangeEvent, ButtonClickEvent } from '../../types';

const LoginModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<'proprietario' | 'inquilino'>('proprietario');
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    cpf: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: ButtonClickEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    if (!isLogin && formData.password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (isLogin) {
      const loginData = {
        username: formData.email,
        password: formData.password,
      };

      login(loginData)
        .then(() => {
          onClose();
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Login failed:", error);
          alert("Erro ao fazer login. Por favor, tente novamente.");
        });
    } else {
      const registerData = {
        username: formData.email,
        password: formData.password
      };

      UserService.register(registerData)
        .then(() => {
          alert("Cadastro realizado com sucesso!");
          setIsLogin(true);
          setFormData({
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
            phone: "",
            cpf: "",
          });
        })
        .catch((error) => {
          console.error("Registration failed:", error);
          alert("Erro ao fazer cadastro. Por favor, tente novamente.");
        });
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
      cpf: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/5 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <HiHome className="w-6 h-6 text-sky-600" />
            <span className="text-xl font-bold text-gray-900">DomusApp</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <HiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isLogin ? "Fazer Login" : "Criar Conta"}
            </h2>
            <p className="text-gray-600">
              {isLogin
                ? "Entre na sua conta para continuar"
                : "Cadastre-se para começar a usar"}
            </p>
          </div>

          {!isLogin && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tipo de usuário
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType("proprietario")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    userType === "proprietario"
                      ? "border-sky-600 bg-sky-50 text-sky-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <HiOfficeBuilding className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">Proprietário</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Tenho imóveis
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("inquilino")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    userType === "inquilino"
                      ? "border-sky-600 bg-sky-50 text-sky-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <HiBadgeCheck className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">Inquilino</div>
                  <div className="text-xs text-gray-500 mt-1">Alugo imóvel</div>
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <div className="relative">
                  <HiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Digite seu nome completo"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-600 focus:border-transparent transition-all text-base"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Digite seu email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-600 focus:border-transparent transition-all text-base"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <div className="relative">
                  <HiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(11) 99999-9999"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-600 focus:border-transparent transition-all text-base"
                    required
                  />
                </div>
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CPF
                </label>
                <div className="relative">
                  <HiBadgeCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    placeholder="000.000.000-00"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-600 focus:border-transparent transition-all text-base"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Digite sua senha"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-600 focus:border-transparent transition-all text-base"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <HiEyeOff className="w-5 h-5" />
                  ) : (
                    <HiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {!isLogin && (
                <p className="text-xs text-gray-500 mt-1">
                  Mínimo de 6 caracteres
                </p>
              )}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirme sua senha"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-600 focus:border-transparent transition-all text-base"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <HiEyeOff className="w-5 h-5" />
                    ) : (
                      <HiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword &&
                  formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">
                      As senhas não coincidem
                    </p>
                  )}
              </div>
            )}

            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-sky-600 hover:text-sky-700 font-medium"
                  onClick={() => alert("Funcionalidade em desenvolvimento")}
                >
                  Esqueceu a senha?
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-sky-600 text-white py-3 px-4 rounded-xl font-medium text-base hover:bg-sky-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLogin ? "Entrar" : "Criar Conta"}
            </button>
          </div>

          {!isLogin && (
            <p className="text-xs text-gray-500 text-center mt-4">
              Ao criar uma conta, você concorda com nossos{" "}
              <button
                className="text-sky-600 hover:underline"
                onClick={() => alert("Funcionalidade em desenvolvimento")}
              >
                Termos de Uso
              </button>{" "}
              e{" "}
              <button
                className="text-sky-600 hover:underline"
                onClick={() => alert("Funcionalidade em desenvolvimento")}
              >
                Política de Privacidade
              </button>
            </p>
          )}

          <div className="text-center mt-6 pt-6 border-t border-gray-100">
            <p className="text-gray-600 mb-2">
              {isLogin ? "Ainda não tem conta?" : "Já tem uma conta?"}
            </p>
            <button
              type="button"
              onClick={toggleMode}
              className="text-sky-600 font-medium hover:text-sky-700 transition-colors"
            >
              {isLogin ? "Cadastrar-se" : "Fazer Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
