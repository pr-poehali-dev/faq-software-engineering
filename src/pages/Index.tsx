import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

type ViewType = 'home' | 'profile' | 'topics' | 'diagnostics' | 'search-results';

interface Topic {
  id: string;
  title: string;
  icon: string;
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
}

const topics: Topic[] = [
  {
    id: 'sdlc',
    title: 'Жизненный цикл разработки ПО',
    icon: 'GitBranch',
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
      }
    ]
  },
  {
    id: 'design-patterns',
    title: 'Паттерны проектирования',
    icon: 'Puzzle',
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
      }
    ]
  },
  {
    id: 'testing',
    title: 'Тестирование ПО',
    icon: 'FlaskConical',
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
      }
    ]
  },
  {
    id: 'version-control',
    title: 'Системы контроля версий',
    icon: 'GitCommitHorizontal',
    questions: [
      {
        question: 'Зачем нужны системы контроля версий?',
        answer: 'СКВ позволяют отслеживать изменения в коде, работать над проектом командой, возвращаться к предыдущим версиям, сравнивать изменения, разрешать конфликты при одновременной работе разработчиков.'
      },
      {
        question: 'Что такое Git и как он работает?',
        answer: 'Git — распределенная система контроля версий. Каждый разработчик имеет полную копию репозитория. Основные концепции: commit (фиксация изменений), branch (ветка для параллельной разработки), merge (слияние веток), pull/push (синхронизация с удаленным репозиторием).'
      },
      {
        question: 'Что такое Git Flow?',
        answer: 'Git Flow — модель ветвления в Git с четкой структурой: master (production), develop (разработка), feature/* (новые функции), release/* (подготовка релиза), hotfix/* (срочные исправления). Обеспечивает организованный процесс разработки.'
      }
    ]
  }
];

const quizQuestions: Quiz[] = [
  {
    id: 1,
    question: 'Какая модель SDLC лучше подходит для проектов с часто меняющимися требованиями?',
    options: ['Waterfall', 'Agile', 'V-Model', 'Spiral'],
    correct: 1
  },
  {
    id: 2,
    question: 'К какому типу паттернов относится Singleton?',
    options: ['Поведенческие', 'Структурные', 'Порождающие', 'Архитектурные'],
    correct: 2
  },
  {
    id: 3,
    question: 'Что проверяет Unit-тестирование?',
    options: ['Всю систему целиком', 'Отдельные компоненты', 'Взаимодействие с пользователем', 'Производительность'],
    correct: 1
  },
  {
    id: 4,
    question: 'Что означает команда git merge?',
    options: ['Создание новой ветки', 'Слияние веток', 'Удаление изменений', 'Отправка на сервер'],
    correct: 1
  },
  {
    id: 5,
    question: 'В каком порядке выполняется цикл TDD?',
    options: ['Код → Тест → Рефакторинг', 'Тест → Код → Рефакторинг', 'Рефакторинг → Тест → Код', 'Код → Рефакторинг → Тест'],
    correct: 1
  }
];

export default function Index() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const [quizProgress, setQuizProgress] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState('Студент');
  const [userEmail, setUserEmail] = useState('student@se.guide');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === quizQuestions[currentQuizIndex].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuizIndex < quizQuestions.length - 1) {
        setCurrentQuizIndex(currentQuizIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setQuizProgress(((currentQuizIndex + 1) / quizQuestions.length) * 100);
      } else {
        setQuizProgress(100);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizProgress(0);
  };

  const filteredTopics = topics.map(topic => ({
    ...topic,
    questions: topic.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(topic => topic.questions.length > 0);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <aside className="w-64 border-r border-sidebar-border bg-sidebar p-4 flex flex-col">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Icon name="GraduationCap" className="text-primary" size={24} />
          </div>
          <div>
            <h1 className="font-semibold text-lg">SE Guide</h1>
            <p className="text-xs text-muted-foreground">Программная инженерия</p>
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
            onClick={() => setCurrentView('profile')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              currentView === 'profile' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'hover:bg-sidebar-accent/50'
            }`}
          >
            <Icon name="User" size={20} />
            <span className="font-medium">Профиль</span>
          </button>

          <button
            onClick={() => setCurrentView('diagnostics')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              currentView === 'diagnostics' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'hover:bg-sidebar-accent/50'
            }`}
          >
            <Icon name="Brain" size={20} />
            <span className="font-medium">Диагностика знаний</span>
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
        </nav>

        <div className="pt-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Icon name="User" size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{userName}</p>
              <p className="text-xs text-muted-foreground">{userEmail}</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="max-w-4xl mx-auto p-8">
            {currentView === 'home' && (
              <div className="animate-fade-in space-y-8">
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 animate-scale-in">
                    <Icon name="Sparkles" className="text-primary" size={40} />
                  </div>
                  <h2 className="text-4xl font-bold mb-3">Что вы хотите узнать?</h2>
                  <p className="text-muted-foreground mb-10 text-lg">Найдите ответы на вопросы по программной инженерии</p>
                  
                  <div className="relative max-w-2xl mx-auto">
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && searchQuery.trim()) {
                          setSearchResults(searchQuery);
                          setCurrentView('search-results');
                        }
                      }}
                      placeholder="Введите ваш вопрос..."
                      className="h-16 pl-14 pr-14 text-lg bg-card border-2 border-border hover:border-primary/50 focus:border-primary transition-colors rounded-2xl shadow-lg"
                    />
                    <Icon name="Search" className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" size={22} />
                    {searchQuery && (
                      <Button
                        size="sm"
                        onClick={() => {
                          setSearchResults(searchQuery);
                          setCurrentView('search-results');
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl"
                      >
                        Найти
                      </Button>
                    )}
                  </div>
                  
                  <div className="mt-8 flex flex-wrap justify-center gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 transition-colors"
                      onClick={() => { setSearchQuery('Что такое SDLC?'); }}>
                      Что такое SDLC?
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 transition-colors"
                      onClick={() => { setSearchQuery('Паттерны проектирования'); }}>
                      Паттерны проектирования
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 transition-colors"
                      onClick={() => { setSearchQuery('Методы тестирования'); }}>
                      Методы тестирования
                    </Badge>
                  </div>
                </div>

                {false && searchQuery ? (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Результаты поиска</h3>
                    {filteredTopics.length > 0 ? (
                      filteredTopics.map(topic => (
                        <Card key={topic.id} className="animate-scale-in">
                          <CardHeader>
                            <div className="flex items-center gap-3">
                              <Icon name={topic.icon as any} className="text-primary" size={24} />
                              <CardTitle>{topic.title}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Accordion type="single" collapsible className="space-y-2">
                              {topic.questions.map((q, idx) => (
                                <AccordionItem key={idx} value={`${topic.id}-${idx}`} className="border border-border rounded-lg px-4">
                                  <AccordionTrigger className="hover:no-underline">
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
                      ))
                    ) : (
                      <Card>
                        <CardContent className="py-12 text-center">
                          <Icon name="SearchX" className="mx-auto mb-4 text-muted-foreground" size={48} />
                          <p className="text-muted-foreground">По вашему запросу ничего не найдено</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ) : null}
              </div>
            )}

            {currentView === 'profile' && (
              <div className="animate-fade-in space-y-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold">Профиль</h2>
                  {!isEditingProfile && (
                    <Button variant="outline" onClick={() => setIsEditingProfile(true)}>
                      <Icon name="Pencil" size={16} className="mr-2" />
                      Редактировать
                    </Button>
                  )}
                </div>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                        <Icon name="User" size={32} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        {isEditingProfile ? (
                          <div className="space-y-2">
                            <Input
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                              placeholder="Имя"
                              className="font-semibold"
                            />
                            <Input
                              value={userEmail}
                              onChange={(e) => setUserEmail(e.target.value)}
                              placeholder="Email"
                              type="email"
                            />
                          </div>
                        ) : (
                          <div>
                            <CardTitle>{userName}</CardTitle>
                            <CardDescription>{userEmail}</CardDescription>
                          </div>
                        )}
                      </div>
                      {isEditingProfile && (
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => setIsEditingProfile(false)}>
                            <Icon name="Check" size={16} className="mr-1" />
                            Сохранить
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setIsEditingProfile(false)}>
                            Отмена
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Статистика обучения</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Пройдено тем</span>
                        <span className="text-sm text-muted-foreground">3 из 4</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    
                    <div className="text-center p-4 rounded-lg bg-card border border-border">
                      <div className="text-2xl font-bold text-primary">85%</div>
                      <div className="text-xs text-muted-foreground mt-1">Точность тестов</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>История прохождения тестов</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon name="CheckCircle2" className="text-primary" size={20} />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Общий тест по SE</p>
                            <p className="text-xs text-muted-foreground">2 дня назад</p>
                          </div>
                        </div>
                        <Badge variant="secondary">85%</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon name="CheckCircle2" className="text-primary" size={20} />
                          </div>
                          <div>
                            <p className="font-medium text-sm">SDLC модели</p>
                            <p className="text-xs text-muted-foreground">5 дней назад</p>
                          </div>
                        </div>
                        <Badge variant="secondary">90%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentView === 'topics' && (
              <div className="animate-fade-in space-y-6">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">База знаний</h2>
                  <p className="text-muted-foreground">Структурированный каталог материалов по программной инженерии</p>
                </div>
                
                <div className="relative max-w-xl mb-6">
                  <Input
                    placeholder="Фильтр по темам..."
                    className="pl-10 bg-card"
                  />
                  <Icon name="Filter" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                </div>
                
                {topics.map(topic => (
                  <Card key={topic.id}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon name={topic.icon as any} className="text-primary" size={24} />
                        </div>
                        <div>
                          <CardTitle>{topic.title}</CardTitle>
                          <CardDescription>{topic.questions.length} вопросов</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="space-y-2">
                        {topic.questions.map((q, idx) => (
                          <AccordionItem key={idx} value={`${topic.id}-${idx}`} className="border border-border rounded-lg px-4">
                            <AccordionTrigger className="hover:no-underline">
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
            )}

            {currentView === 'search-results' && (
              <div className="animate-fade-in space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <Button variant="ghost" size="icon" onClick={() => setCurrentView('home')}>
                    <Icon name="ArrowLeft" size={20} />
                  </Button>
                  <div>
                    <h2 className="text-3xl font-bold">Результаты поиска</h2>
                    <p className="text-muted-foreground">Запрос: "{searchResults}"</p>
                  </div>
                </div>

                {filteredTopics.length > 0 ? (
                  filteredTopics.map(topic => (
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
                              <AccordionTrigger className="hover:no-underline">
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
                  ))
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

            {currentView === 'diagnostics' && (
              <div className="animate-fade-in space-y-6">
                <h2 className="text-3xl font-bold mb-8">Диагностика знаний</h2>
                
                {quizProgress < 100 ? (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Тест по программной инженерии</CardTitle>
                        <Badge variant="secondary">
                          {currentQuizIndex + 1} / {quizQuestions.length}
                        </Badge>
                      </div>
                      <Progress value={(currentQuizIndex / quizQuestions.length) * 100} className="mt-4" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-6">
                          {quizQuestions[currentQuizIndex].question}
                        </h3>
                        
                        <div className="space-y-3">
                          {quizQuestions[currentQuizIndex].options.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => !showResult && handleQuizAnswer(idx)}
                              disabled={showResult}
                              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                                showResult
                                  ? idx === quizQuestions[currentQuizIndex].correct
                                    ? 'border-green-500 bg-green-500/10'
                                    : idx === selectedAnswer
                                    ? 'border-red-500 bg-red-500/10'
                                    : 'border-border bg-card'
                                  : selectedAnswer === idx
                                  ? 'border-primary bg-primary/10'
                                  : 'border-border bg-card hover:border-primary/50'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                  showResult && idx === quizQuestions[currentQuizIndex].correct
                                    ? 'border-green-500 bg-green-500'
                                    : showResult && idx === selectedAnswer
                                    ? 'border-red-500 bg-red-500'
                                    : 'border-current'
                                }`}>
                                  {showResult && idx === quizQuestions[currentQuizIndex].correct && (
                                    <Icon name="Check" size={16} className="text-white" />
                                  )}
                                  {showResult && idx === selectedAnswer && idx !== quizQuestions[currentQuizIndex].correct && (
                                    <Icon name="X" size={16} className="text-white" />
                                  )}
                                </div>
                                <span className="font-medium">{option}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="animate-scale-in">
                    <CardHeader className="text-center">
                      <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                        <Icon name="Trophy" className="text-primary" size={40} />
                      </div>
                      <CardTitle className="text-2xl">Тест завершен!</CardTitle>
                      <CardDescription>Вы ответили правильно на {score} из {quizQuestions.length} вопросов</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <div className="text-center mb-2">
                          <span className="text-4xl font-bold text-primary">
                            {Math.round((score / quizQuestions.length) * 100)}%
                          </span>
                        </div>
                        <Progress value={(score / quizQuestions.length) * 100} className="h-3" />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 rounded-lg bg-card border border-border">
                          <div className="text-2xl font-bold text-green-500">{score}</div>
                          <div className="text-xs text-muted-foreground mt-1">Правильных</div>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-card border border-border">
                          <div className="text-2xl font-bold text-red-500">{quizQuestions.length - score}</div>
                          <div className="text-xs text-muted-foreground mt-1">Неправильных</div>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-card border border-border">
                          <div className="text-2xl font-bold text-primary">{quizQuestions.length}</div>
                          <div className="text-xs text-muted-foreground mt-1">Всего</div>
                        </div>
                      </div>

                      <Button onClick={resetQuiz} className="w-full" size="lg">
                        <Icon name="RotateCcw" className="mr-2" size={20} />
                        Пройти снова
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