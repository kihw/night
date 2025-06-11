import React from 'react';
import { Moon, Shield, Settings, Zap, Download, Monitor, Volume2, Clock, CheckCircle, Github } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="relative z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Moon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">NightMod</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">Fonctionnalités</a>
              <a href="#screenshots" className="text-slate-300 hover:text-white transition-colors">Aperçu</a>
              <a href="#download" className="text-slate-300 hover:text-white transition-colors">Télécharger</a>
            </nav>
            <button className="md:hidden text-slate-300 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-purple-500/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
                <Moon className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              NightMod
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              Application de bureau intelligente qui surveille votre activité et protège automatiquement 
              votre ordinateur lorsque vous vous endormez
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Télécharger Gratuitement</span>
                </div>
              </button>
              <button className="border-2 border-slate-600 hover:border-slate-500 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-slate-800">
                Voir les fonctionnalités
              </button>
            </div>
            
            <div className="flex justify-center items-center space-x-6 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Gratuit & Open Source</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span>Sécurisé</span>
              </div>
              <div className="flex items-center space-x-2">
                <Monitor className="w-4 h-4 text-purple-400" />
                <span>Multi-plateforme</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Fonctionnalités Avancées</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Conçu pour vous offrir une expérience nocturne optimale tout en protégeant votre travail
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Surveillance Intelligente */}
            <div className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Surveillance Intelligente</h3>
              <ul className="text-slate-300 space-y-2">
                <li>• Vérifications périodiques personnalisables</li>
                <li>• Actions configurables (extinction, veille, verrouillage)</li>
                <li>• Compte à rebours visuel moderne</li>
                <li>• Interface de nuit confortable</li>
              </ul>
            </div>

            {/* Interface Utilisateur */}
            <div className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                <Monitor className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Interface Moderne</h3>
              <ul className="text-slate-300 space-y-2">
                <li>• Thème sombre inspiré du Fluent Design</li>
                <li>• Icône discrète dans la barre des tâches</li>
                <li>• Notifications sonores configurables</li>
                <li>• Animations fluides et élégantes</li>
              </ul>
            </div>

            {/* Configuration Flexible */}
            <div className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
                <Settings className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Configuration Flexible</h3>
              <ul className="text-slate-300 space-y-2">
                <li>• Intervalles de 1 minute à plusieurs heures</li>
                <li>• Temps de réponse ajustable (10s à 2min)</li>
                <li>• Démarrage automatique du système</li>
                <li>• Minimisation intelligente</li>
              </ul>
            </div>

            {/* Économie d'Énergie */}
            <div className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Économie d'Énergie</h3>
              <ul className="text-slate-300 space-y-2">
                <li>• Extinction automatique intelligente</li>
                <li>• Protection de votre travail</li>
                <li>• Idéal pour regarder des films</li>
                <li>• Surveillance pendant la lecture</li>
              </ul>
            </div>

            {/* Sécurité */}
            <div className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Protection Avancée</h3>
              <ul className="text-slate-300 space-y-2">
                <li>• Verrouillage automatique d'écran</li>
                <li>• Protection des données sensibles</li>
                <li>• Surveillance non-intrusive</li>
                <li>• Contrôle total de la confidentialité</li>
              </ul>
            </div>

            {/* Audio & Notifications */}
            <div className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6">
                <Volume2 className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Alertes Personnalisées</h3>
              <ul className="text-slate-300 space-y-2">
                <li>• Notifications sonores configurables</li>
                <li>• Mode silencieux disponible</li>
                <li>• Alertes visuelles élégantes</li>
                <li>• Système de notification discret</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section id="screenshots" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Interface Élégante</h2>
            <p className="text-xl text-slate-300">Découvrez l'interface moderne et intuitive de NightMod</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Interface Principale */}
            <div className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-700">
              <h3 className="text-xl font-semibold mb-6 text-center">Interface Principale</h3>
              <div className="bg-slate-900 p-6 rounded-xl border-2 border-slate-700 font-mono text-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-400">État: Actif</span>
                  </div>
                </div>
                <div className="space-y-3 text-slate-300">
                  <div>Prochaine vérif: <span className="text-blue-400">18min</span></div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-3/4"></div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-3 rounded-lg mt-4">
                    Démarrer surveillance
                  </button>
                  <div className="mt-4 space-y-2">
                    <div className="text-sm">Paramètres:</div>
                    <div className="text-sm ml-2">• Intervalle: 20 min</div>
                    <div className="text-sm ml-2">• Temps réponse: 30s</div>
                    <div className="text-sm ml-2">• Action: shutdown</div>
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Son activé</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Démarrage auto</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fenêtre de Vérification */}
            <div className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-700">
              <h3 className="text-xl font-semibold mb-6 text-center">Fenêtre de Vérification</h3>
              <div className="bg-slate-900 p-6 rounded-xl border-2 border-slate-700 text-center">
                <h4 className="text-lg font-semibold mb-6">Êtes-vous éveillé ?</h4>
                <div className="flex justify-center mb-6">
                  <div className="relative w-20 h-20">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-slate-700"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${2 * Math.PI * 45 * 0.3}`}
                        className="text-orange-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-orange-400">25</span>
                    </div>
                  </div>
                </div>
                <div className="text-slate-400 mb-6">secondes</div>
                <button className="bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 rounded-lg font-semibold mb-4">
                  Je suis éveillé
                </button>
                <div className="text-sm text-slate-400">Action: extinction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 bg-gradient-to-b from-slate-800/50 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à Protéger Votre Travail ?</h2>
          <p className="text-xl text-slate-300 mb-12">
            Téléchargez NightMod gratuitement et commencez à économiser l'énergie dès tonight
          </p>

          <div className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 mb-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">Linux (Fedora)</h3>
                <p className="text-sm text-slate-400">Support natif confirmé</p>
              </div>
              <div className="text-center opacity-50">
                <div className="w-12 h-12 bg-slate-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="font-semibold mb-2">Windows</h3>
                <p className="text-sm text-slate-400">Bientôt disponible</p>
              </div>
              <div className="text-center opacity-50">
                <div className="w-12 h-12 bg-slate-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="font-semibold mb-2">macOS</h3>
                <p className="text-sm text-slate-400">Bientôt disponible</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                <div className="flex items-center justify-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Télécharger pour Linux</span>
                </div>
              </button>
              <button className="border-2 border-slate-600 hover:border-slate-500 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-slate-800">
                <div className="flex items-center justify-center space-x-2">
                  <Github className="w-5 h-5" />
                  <span>Voir sur GitHub</span>
                </div>
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-8 text-sm text-slate-400">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>100% Gratuit</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>Open Source</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>Installation en 2 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Moon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">NightMod</span>
            </div>
            
            <div className="flex items-center space-x-6 text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-400">
            <p>&copy; 2025 NightMod. Application gratuite et open source pour protéger votre travail nocturne.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;