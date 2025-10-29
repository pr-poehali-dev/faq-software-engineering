import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type ViewType = 'home' | 'profile' | 'topics' | 'diagnostics' | 'search-results' | 'quiz-active';

interface Topic {
  id: string;
  title: string;
  icon: string;
  description: string;
  questions: Question[];
}

interface Question {
  question: string;
  answer: string;
}

interface Quiz {
  id: number;
  question: string;
  options: string[];
  correct: number;
  topic: string;
}

interface TestHistory {
  date: string;
  topic: string;
  score: number;
  total: number;
}

const topics: Topic[] = [
  {
    id: 'sdlc',
    title: 'Жизненный цикл разработки ПО',
    icon: 'GitBranch',
    description: '',
    questions: [
      {
        question: 'Что такое SDLC?',
        answer: 'SDLC (Software Development Life Cycle) — это процесс планирования, создания, тестирования и развертывания информационной системы. Включает этапы: анализ требований, проектирование, разработка, тестирование, внедрение и поддержка.'
      },
      {
        question: 'Какие основные модели SDLC существуют?',
        answer: 'Основные модели: Waterfall (каскадная), Agile (гибкая), Scrum, Kanban, DevOps, Spiral (спиральная), V-Model. Каждая модель имеет свои преимущества в зависимости от специфики проекта.'
      },
      {
        question: 'В чем отличие Agile от Waterfall?',
        answer: 'Waterfall — последовательная модель с четкими этапами, требует завершения каждого этапа перед переходом к следующему. Agile — итеративная модель с короткими циклами разработки (спринтами), позволяет быстро адаптироваться к изменениям требований.'
      },
      {
        question: 'Что такое спринт в Agile?',
        answer: 'Спринт — это короткий временной промежуток (обычно 1-4 недели), в течение которого команда разработки создает готовую к использованию версию продукта. По окончании спринта проводится демонстрация результатов и планирование следующего спринта.'
      },
      {
        question: 'Какие роли есть в Scrum?',
        answer: 'Основные роли в Scrum: Product Owner (владелец продукта) — определяет требования и приоритеты, Scrum Master — помогает команде следовать процессу, Development Team (команда разработки) — создает продукт.'
      }
    ]
  },
  {
    id: 'design-patterns',
    title: 'Паттерны проектирования',
    icon: 'Puzzle',
    description: '',
    questions: [
      {
        question: 'Что такое паттерн проектирования?',
        answer: 'Паттерн проектирования — это типовое решение часто встречающихся проблем в проектировании программного обеспечения. Это шаблон, который можно применить в конкретной ситуации.'
      },
      {
        question: 'Какие типы паттернов существуют?',
        answer: 'Три основных типа: Порождающие (Creational) — создание объектов, Структурные (Structural) — организация классов и объектов, Поведенческие (Behavioral) — взаимодействие между объектами.'
      },
      {
        question: 'Что такое паттерн Singleton?',
        answer: 'Singleton — порождающий паттерн, который гарантирует существование только одного экземпляра класса и предоставляет глобальную точку доступа к этому экземпляру. Используется для логгеров, конфигураций, пулов соединений.'
      },
      {
        question: 'Что такое паттерн Factory?',
        answer: 'Factory (Фабрика) — порождающий паттерн, который определяет общий интерфейс для создания объектов, позволяя подклассам изменять тип создаваемых объектов. Используется когда заранее неизвестен тип создаваемого объекта.'
      },
      {
        question: 'Что такое паттерн Observer?',
        answer: 'Observer (Наблюдатель) — поведенческий паттерн, который создает механизм подписки для оповещения нескольких объектов о событиях. Используется для реализации событийных систем и реактивного программирования.'
      }
    ]
  },
  {
    id: 'testing',
    title: 'Тестирование ПО',
    icon: 'FlaskConical',
    description: '',
    questions: [
      {
        question: 'Какие уровни тестирования существуют?',
        answer: 'Модульное (Unit) — тестирование отдельных компонентов, Интеграционное — взаимодействие между компонентами, Системное — проверка всей системы, Приемочное (Acceptance) — проверка соответствия требованиям заказчика.'
      },
      {
        question: 'Что такое TDD?',
        answer: 'TDD (Test-Driven Development) — методология разработки через тестирование. Цикл: написать падающий тест → написать минимальный код для прохождения теста → рефакторинг. Помогает создавать более надежный и поддерживаемый код.'
      },
      {
        question: 'В чем разница между Black Box и White Box тестированием?',
        answer: 'Black Box — тестирование без знания внутренней структуры кода, проверяет только функциональность. White Box — тестирование с полным знанием внутренней структуры, проверяет логику и пути выполнения кода.'
      },
      {
        question: 'Что такое регрессионное тестирование?',
        answer: 'Регрессионное тестирование — это повторное тестирование системы после внесения изменений для проверки, что новый код не нарушил существующую функциональность. Обычно автоматизируется.'
      },
      {
        question: 'Что такое smoke testing?',
        answer: 'Smoke testing — это предварительная проверка критически важной функциональности системы. Если базовые функции не работают, дальнейшее тестирование не имеет смысла. Это быстрый тест стабильности сборки.'
      }
    ]
  },
  {
    id: 'version-control',
    title: 'Системы контроля версий',
    icon: 'GitCommitHorizontal',
    description: '',
    questions: [
      {
        question: 'Зачем нужны системы контроля версий?',
        answer: 'СКВ позволяют отслеживать изменения в коде, работать над проектом командой, возвращаться к предыдущим версиям, сравнивать изменения, разрешать конфликты при одновременной работе разработчиков.'
      },
      {
        question: 'Что такое Git и как он работает?',
        answer: 'Git — распределенная система контроля версий. Каждый разработчик имеет полную копию репозитория. Основные операции: commit (фиксация изменений), push (отправка на сервер), pull (получение изменений), branch (ветвление).'
      },
      {
        question: 'Что такое ветка (branch) в Git?',
        answer: 'Ветка — это независимая линия разработки. Позволяет работать над новой функциональностью, не затрагивая основной код. После завершения работы ветка сливается (merge) с основной веткой.'
      },
      {
        question: 'Что такое pull request?',
        answer: 'Pull Request (PR) — это запрос на слияние изменений из одной ветки в другую. Позволяет провести код-ревью перед включением изменений в основную кодовую базу. Используется для контроля качества кода.'
      },
      {
        question: 'Как разрешить конфликт слияния?',
        answer: 'Конфликт возникает когда два разработчика изменили одни и те же строки. Для разрешения нужно: открыть файл с конфликтом, выбрать нужные изменения (или объединить их вручную), удалить маркеры конфликта, сделать commit.'
      }
    ]
  },
  {
    id: 'architecture',
    title: 'Архитектура ПО',
    icon: 'Building2',
    description: '',
    questions: [
      {
        question: 'Что такое архитектура ПО?',
        answer: 'Архитектура ПО — это структура системы, включающая компоненты программного обеспечения, их свойства и связи между ними. Определяет, как система организована на высоком уровне.'
      },
      {
        question: 'Что такое монолитная архитектура?',
        answer: 'Монолитная архитектура — это подход, где всё приложение разработано как единый неделимый модуль. Все компоненты работают в одном процессе. Проще разрабатывать, но сложнее масштабировать.'
      },
      {
        question: 'Что такое микросервисная архитектура?',
        answer: 'Микросервисная архитектура — приложение разделено на независимые сервисы, каждый отвечает за свою функцию. Сервисы взаимодействуют через API. Легче масштабировать и поддерживать, но сложнее в разработке.'
      },
      {
        question: 'Что такое слоистая архитектура?',
        answer: 'Слоистая архитектура делит систему на горизонтальные слои: Presentation (UI), Business Logic, Data Access. Каждый слой взаимодействует только с соседними слоями, что обеспечивает разделение ответственности.'
      },
      {
        question: 'Что такое SOLID принципы?',
        answer: 'SOLID — пять принципов ООП: Single Responsibility (единственная ответственность), Open/Closed (открыт для расширения, закрыт для изменения), Liskov Substitution (подстановка Лисков), Interface Segregation (разделение интерфейсов), Dependency Inversion (инверсия зависимостей).'
      }
    ]
  },

];

const quizzes: Quiz[] = [
  {
    id: 1,
    question: 'Какая модель разработки предполагает последовательное прохождение всех этапов?',
    options: ['Agile', 'Waterfall', 'Scrum', 'Kanban'],
    correct: 1,
    topic: 'sdlc'
  },
  {
    id: 2,
    question: 'Что такое спринт в Agile?',
    options: [
      'Быстрое выполнение задачи',
      'Короткий цикл разработки (1-4 недели)',
      'Встреча команды',
      'Финальный этап проекта'
    ],
    correct: 1,
    topic: 'sdlc'
  },
  {
    id: 3,
    question: 'Какой паттерн гарантирует существование только одного экземпляра класса?',
    options: ['Factory', 'Observer', 'Singleton', 'Strategy'],
    correct: 2,
    topic: 'design-patterns'
  },
  {
    id: 4,
    question: 'К какому типу относится паттерн Observer?',
    options: ['Порождающий', 'Структурный', 'Поведенческий', 'Архитектурный'],
    correct: 2,
    topic: 'design-patterns'
  },
  {
    id: 5,
    question: 'Что означает TDD?',
    options: [
      'Test Deployment Development',
      'Total Development Design',
      'Test-Driven Development',
      'Technical Documentation Design'
    ],
    correct: 2,
    topic: 'testing'
  },
  {
    id: 6,
    question: 'Какой тип тестирования проверяет взаимодействие между компонентами?',
    options: ['Модульное', 'Интеграционное', 'Системное', 'Приемочное'],
    correct: 1,
    topic: 'testing'
  },
  {
    id: 7,
    question: 'Что делает команда git commit?',
    options: [
      'Отправляет изменения на сервер',
      'Фиксирует изменения локально',
      'Создает новую ветку',
      'Получает изменения с сервера'
    ],
    correct: 1,
    topic: 'version-control'
  },
  {
    id: 8,
    question: 'Что такое Pull Request?',
    options: [
      'Получение изменений с сервера',
      'Запрос на слияние изменений',
      'Отправка изменений',
      'Создание ветки'
    ],
    correct: 1,
    topic: 'version-control'
  },
  {
    id: 9,
    question: 'Какая архитектура делит приложение на независимые сервисы?',
    options: ['Монолитная', 'Слоистая', 'Микросервисная', 'Клиент-серверная'],
    correct: 2,
    topic: 'architecture'
  },
  {
    id: 10,
    question: 'Что означает буква "S" в SOLID?',
    options: [
      'Simple Responsibility',
      'Single Responsibility',
      'System Responsibility',
      'Stable Responsibility'
    ],
    correct: 1,
    topic: 'architecture'
  }
];

export default function Index() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Topic[]>([]);
  const [userName, setUserName] = useState('student123');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');
  const [testHistory, setTestHistory] = useState<TestHistory[]>([
    { date: '2024-10-20', topic: 'Жизненный цикл разработки ПО', score: 8, total: 10 },
    { date: '2024-10-15', topic: 'Паттерны проектирования', score: 7, total: 10 },
    { date: '2024-10-10', topic: 'Тестирование ПО', score: 9, total: 10 }
  ]);

  const [currentQuiz, setCurrentQuiz] = useState<Quiz[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('all');

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase();
    const results = topics.filter(topic =>
      topic.title.toLowerCase().includes(query) ||
      topic.description.toLowerCase().includes(query) ||
      topic.questions.some(q =>
        q.question.toLowerCase().includes(query) ||
        q.answer.toLowerCase().includes(query)
      )
    ).map(topic => ({
      ...topic,
      questions: topic.questions.filter(q =>
        q.question.toLowerCase().includes(query) ||
        q.answer.toLowerCase().includes(query)
      )
    }));

    setSearchResults(results);
    setCurrentView('search-results');
  };

  const startQuiz = (topicId: string = 'all') => {
    setSelectedTopic(topicId);
    let filteredQuizzes = quizzes;
    
    if (topicId !== 'all') {
      filteredQuizzes = quizzes.filter(q => q.topic === topicId);
    }

    const shuffled = [...filteredQuizzes].sort(() => Math.random() - 0.5).slice(0, 10);
    setCurrentQuiz(shuffled);
    setSelectedAnswers([]);
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    setCurrentView('quiz-active');
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const finishQuiz = () => {
    const score = selectedAnswers.filter((answer, idx) => answer === currentQuiz[idx].correct).length;
    const newHistory: TestHistory = {
      date: new Date().toISOString().split('T')[0],
      topic: selectedTopic === 'all' ? 'Общая диагностика' : topics.find(t => t.id === selectedTopic)?.title || 'Тест',
      score,
      total: currentQuiz.length
    };
    setTestHistory([newHistory, ...testHistory]);
    setQuizCompleted(true);
  };

  const resetQuiz = () => {
    setCurrentView('diagnostics');
  };

  const calculateTotalProgress = () => {
    if (testHistory.length === 0) return 0;
    const totalScore = testHistory.reduce((sum, test) => sum + test.score, 0);
    const totalQuestions = testHistory.reduce((sum, test) => sum + test.total, 0);
    return Math.round((totalScore / totalQuestions) * 100);
  };

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 border-r border-sidebar-border bg-sidebar flex flex-col p-4">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="GraduationCap" className="text-primary-foreground" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-sidebar-foreground">SE Guide</h1>
              <p className="text-xs text-muted-foreground"></p>
            </div>
          </div>
        </div>

        <nav className="space-y-1 flex-1">
          <button
            onClick={() => setCurrentView('home')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              currentView === 'home' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'hover:bg-sidebar-accent/50'
            }`}
          >
            <Icon name="Home" size={20} />
            <span className="font-medium">Главная</span>
          </button>

          <button
            onClick={() => setCurrentView('topics')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              currentView === 'topics' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'hover:bg-sidebar-accent/50'
            }`}
          >
            <Icon name="BookOpen" size={20} />
            <span className="font-medium">База знаний</span>
          </button>

          <button
            onClick={() => setCurrentView('diagnostics')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              currentView === 'diagnostics' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'hover:bg-sidebar-accent/50'
            }`}
          >
            <Icon name="Brain" size={20} />
            <span className="font-medium">Диагностика</span>
          </button>

          <button
            onClick={() => setCurrentView('profile')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              currentView === 'profile' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'hover:bg-sidebar-accent/50'
            }`}
          >
            <Icon name="User" size={20} />
            <span className="font-medium">Профиль</span>
          </button>
        </nav>

        <div className="pt-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Icon name="User" size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{userName}</p>
              <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="max-w-5xl mx-auto p-8">
            {currentView === 'home' && (
              <div className="animate-fade-in space-y-8">
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 animate-scale-in">
                    <Icon name="GraduationCap" className="text-primary" size={40} />
                  </div>
                  <h1 className="text-4xl font-bold mb-3">Справочник по программной инженерии</h1>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto"></p>
                </div>

                <div className="max-w-2xl mx-auto">
                  <div className="relative">
                    <Input
                      placeholder="Найти тему или вопрос..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      className="h-14 pl-12 pr-24 text-lg bg-card border-2"
                    />
                    <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                    <Button 
                      onClick={handleSearch}
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      size="sm"
                    >
                      Найти
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    <Badge 
                      variant="secondary" 
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => { setSearchQuery('Agile'); handleSearch(); }}
                    >
                      Agile
                    </Badge>
                    <Badge 
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => { setSearchQuery('Паттерны'); handleSearch(); }}
                    >
                      Паттерны
                    </Badge>
                    <Badge 
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => { setSearchQuery('Тестирование'); handleSearch(); }}
                    >
                      Тестирование
                    </Badge>
                    <Badge 
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => { setSearchQuery('Git'); handleSearch(); }}
                    >
                      Git
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {currentView === 'topics' && (
              <div className="animate-fade-in space-y-6">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">База знаний</h2>
                </div>

                <div className="grid gap-6">
                  {topics.map((topic) => (
                    <Card key={topic.id} className="animate-scale-in hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Icon name={topic.icon as any} className="text-primary" size={24} />
                            </div>
                            <div>
                              <CardTitle>{topic.title}</CardTitle>
                              <CardDescription>{topic.description}</CardDescription>
                            </div>
                          </div>
                          <Badge variant="secondary">{topic.questions.length} вопросов</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="space-y-2">
                          {topic.questions.map((q, idx) => (
                            <AccordionItem key={idx} value={`${topic.id}-${idx}`} className="border border-border rounded-lg px-4">
                              <AccordionTrigger className="hover:no-underline text-left">
                                <span className="flex items-start gap-2">
                                  <span className="text-primary font-semibold min-w-[24px]">{idx + 1}.</span>
                                  <span>{q.question}</span>
                                </span>
                              </AccordionTrigger>
                              <AccordionContent className="text-muted-foreground pt-2">
                                {q.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {currentView === 'diagnostics' && (
              <div className="animate-fade-in space-y-6">
                <div className="max-w-2xl mx-auto">
                  <Card className="text-center">
                    <CardHeader>
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon name="Brain" className="text-primary" size={40} />
                      </div>
                      <CardTitle className="text-2xl">Диагностика знаний</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-lg text-muted-foreground">
                        Пройдите регистрацию на платформе, чтобы проверить свои знания
                      </p>
                      <Button onClick={() => setCurrentView('profile')} size="lg" className="w-full">
                        <Icon name="UserPlus" className="mr-2" size={20} />
                        Перейти к регистрации
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {currentView === 'quiz-active' && !quizCompleted && (
              <div className="animate-fade-in space-y-6 max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <Button variant="ghost" onClick={() => setCurrentView('diagnostics')}>
                    <Icon name="ArrowLeft" className="mr-2" size={16} />
                    Вернуться
                  </Button>
                  <Badge variant="secondary">
                    Вопрос {currentQuestionIndex + 1} из {currentQuiz.length}
                  </Badge>
                </div>

                <Progress value={((currentQuestionIndex + 1) / currentQuiz.length) * 100} className="mb-6" />

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">{currentQuiz[currentQuestionIndex].question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={selectedAnswers[currentQuestionIndex]?.toString()}
                      onValueChange={(value) => handleAnswerSelect(parseInt(value))}
                    >
                      {currentQuiz[currentQuestionIndex].options.map((option, idx) => (
                        <div key={idx} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-accent cursor-pointer">
                          <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
                          <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                <div className="flex justify-between gap-4">
                  <Button
                    variant="outline"
                    onClick={previousQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    <Icon name="ChevronLeft" className="mr-2" size={16} />
                    Назад
                  </Button>
                  <Button
                    onClick={nextQuestion}
                    disabled={selectedAnswers[currentQuestionIndex] === undefined}
                  >
                    {currentQuestionIndex === currentQuiz.length - 1 ? 'Завершить' : 'Далее'}
                    <Icon name="ChevronRight" className="ml-2" size={16} />
                  </Button>
                </div>
              </div>
            )}

            {currentView === 'quiz-active' && quizCompleted && (
              <div className="animate-fade-in space-y-6 max-w-3xl mx-auto">
                <Card>
                  <CardHeader className="text-center pb-4">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon name="Trophy" className="text-primary" size={40} />
                    </div>
                    <CardTitle className="text-3xl">Тест завершен!</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-primary mb-2">
                        {selectedAnswers.filter((answer, idx) => answer === currentQuiz[idx].correct).length} / {currentQuiz.length}
                      </div>
                      <p className="text-muted-foreground">правильных ответов</p>
                    </div>

                    <Progress 
                      value={(selectedAnswers.filter((answer, idx) => answer === currentQuiz[idx].correct).length / currentQuiz.length) * 100} 
                      className="h-4"
                    />

                    <div className="space-y-4 pt-4">
                      <h3 className="font-semibold text-lg">Разбор ответов:</h3>
                      {currentQuiz.map((quiz, idx) => {
                        const isCorrect = selectedAnswers[idx] === quiz.correct;
                        return (
                          <div key={quiz.id} className={`p-4 rounded-lg border-2 ${isCorrect ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
                            <div className="flex items-start gap-3">
                              <Icon 
                                name={isCorrect ? 'CheckCircle2' : 'XCircle'} 
                                className={isCorrect ? 'text-green-600' : 'text-red-600'}
                                size={20}
                              />
                              <div className="flex-1">
                                <p className="font-medium mb-2">{quiz.question}</p>
                                <p className="text-sm text-muted-foreground">
                                  Ваш ответ: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                                    {quiz.options[selectedAnswers[idx]]}
                                  </span>
                                </p>
                                {!isCorrect && (
                                  <p className="text-sm text-green-600 mt-1">
                                    Правильный ответ: {quiz.options[quiz.correct]}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <Button onClick={resetQuiz} className="w-full" size="lg">
                      <Icon name="RotateCcw" className="mr-2" size={20} />
                      Пройти другой тест
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentView === 'profile' && (
              <div className="animate-fade-in space-y-6">
                <div className="max-w-2xl mx-auto">
                  <h2 className="text-3xl font-bold mb-8">Регистрация</h2>

                  <Card>
                    <CardHeader>
                      <CardTitle>Регистрация</CardTitle>
                      <CardDescription>Заполните данные для создания аккаунта</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="login">Логин</Label>
                          <Input
                            id="login"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="mt-1"
                            placeholder="Введите логин"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Электронная почта</Label>
                          <Input
                            id="email"
                            type="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="mt-1"
                            placeholder="example@mail.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="password">Пароль</Label>
                          <Input
                            id="password"
                            type="password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            className="mt-1"
                            placeholder="Минимум 6 символов"
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={userConfirmPassword}
                            onChange={(e) => setUserConfirmPassword(e.target.value)}
                            className="mt-1"
                            placeholder="Повторите пароль"
                          />
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button className="flex-1">
                            <Icon name="UserPlus" className="mr-2" size={16} />
                            Зарегистрироваться
                          </Button>
                          <Button variant="outline">
                            <Icon name="LogOut" className="mr-2" size={16} />
                            Выйти
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {currentView === 'search-results' && (
              <div className="animate-fade-in space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <Button variant="ghost" size="icon" onClick={() => setCurrentView('home')}>
                    <Icon name="ArrowLeft" size={20} />
                  </Button>
                  <div>
                    <h2 className="text-3xl font-bold">Результаты поиска</h2>
                    <p className="text-muted-foreground">Запрос: "{searchQuery}"</p>
                  </div>
                </div>

                {searchResults.length > 0 ? (
                  <div className="space-y-6">
                    {searchResults.map(topic => (
                      <Card key={topic.id} className="animate-scale-in">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Icon name={topic.icon as any} className="text-primary" size={24} />
                            </div>
                            <div>
                              <CardTitle>{topic.title}</CardTitle>
                              <CardDescription>{topic.questions.length} найдено</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Accordion type="single" collapsible className="space-y-2">
                            {topic.questions.map((q, idx) => (
                              <AccordionItem key={idx} value={`${topic.id}-${idx}`} className="border border-border rounded-lg px-4">
                                <AccordionTrigger className="hover:no-underline text-left">
                                  {q.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                  {q.answer}
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-16 text-center">
                      <Icon name="SearchX" className="mx-auto mb-4 text-muted-foreground" size={56} />
                      <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
                      <p className="text-muted-foreground mb-6">Попробуйте изменить запрос или просмотрите все темы</p>
                      <Button onClick={() => setCurrentView('topics')}>
                        <Icon name="BookOpen" className="mr-2" size={18} />
                        Посмотреть все темы
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}