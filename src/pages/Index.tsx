import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

type ViewType = 'home' | 'profile' | 'topics' | 'diagnostics' | 'search-results' | 'article-view';

interface Article {
  id: string;
  title: string;
  icon: string;
  content: string;
}

const articles: Article[] = [
  {
    id: 'sdlc',
    title: 'Жизненный цикл разработки ПО',
    icon: 'GitBranch',
    content: `SDLC (Software Development Life Cycle) — это процесс планирования, создания, тестирования и развертывания информационной системы. Включает этапы: анализ требований, проектирование, разработка, тестирование, внедрение и поддержка.

Основные модели SDLC:
• Waterfall (каскадная) — последовательная модель с четкими этапами, требует завершения каждого этапа перед переходом к следующему
• Agile (гибкая) — итеративная модель с короткими циклами разработки (спринтами), позволяет быстро адаптироваться к изменениям требований
• Scrum — фреймворк для реализации Agile с ролями: Product Owner, Scrum Master, Development Team
• Kanban — визуальная система управления работой с фокусом на непрерывную поставку
• DevOps — культура автоматизации и сотрудничества между разработкой и эксплуатацией

Спринт в Agile — это короткий временной промежуток (обычно 1-4 недели), в течение которого команда разработки создает готовую к использованию версию продукта. По окончании спринта проводится демонстрация результатов и планирование следующего спринта.`
  },
  {
    id: 'design-patterns',
    title: 'Паттерны проектирования',
    icon: 'Puzzle',
    content: `Паттерн проектирования — это типовое решение часто встречающихся проблем в проектировании программного обеспечения. Это шаблон, который можно применить в конкретной ситуации.

Три основных типа паттернов:
• Порождающие (Creational) — управляют созданием объектов
• Структурные (Structural) — организуют классы и объекты в более крупные структуры
• Поведенческие (Behavioral) — определяют взаимодействие между объектами

Популярные паттерны:

Singleton — порождающий паттерн, который гарантирует существование только одного экземпляра класса и предоставляет глобальную точку доступа к этому экземпляру. Используется для логгеров, конфигураций, пулов соединений.

Factory (Фабрика) — порождающий паттерн, который определяет общий интерфейс для создания объектов, позволяя подклассам изменять тип создаваемых объектов. Используется когда заранее неизвестен тип создаваемого объекта.

Observer (Наблюдатель) — поведенческий паттерн, который создает механизм подписки для оповещения нескольких объектов о событиях. Используется для реализации событийных систем и реактивного программирования.`
  },
  {
    id: 'testing',
    title: 'Тестирование ПО',
    icon: 'FlaskConical',
    content: `Тестирование программного обеспечения — процесс проверки соответствия между реальным и ожидаемым поведением программы.

Уровни тестирования:
• Модульное (Unit) — тестирование отдельных компонентов
• Интеграционное — взаимодействие между компонентами
• Системное — проверка всей системы
• Приемочное (Acceptance) — проверка соответствия требованиям заказчика

TDD (Test-Driven Development) — методология разработки через тестирование. Цикл: написать падающий тест → написать минимальный код для прохождения теста → рефакторинг. Помогает создавать более надежный и поддерживаемый код.

Типы тестирования:
• Black Box — тестирование без знания внутренней структуры кода, проверяет только функциональность
• White Box — тестирование с полным знанием внутренней структуры, проверяет логику и пути выполнения кода

Регрессионное тестирование — это повторное тестирование системы после внесения изменений для проверки, что новый код не нарушил существующую функциональность. Обычно автоматизируется.

Smoke testing — это предварительная проверка критически важной функциональности системы. Если базовые функции не работают, дальнейшее тестирование не имеет смысла.`
  },
  {
    id: 'version-control',
    title: 'Системы контроля версий',
    icon: 'GitCommitHorizontal',
    content: `Системы контроля версий позволяют отслеживать изменения в коде, работать над проектом командой, возвращаться к предыдущим версиям, сравнивать изменения, разрешать конфликты при одновременной работе разработчиков.

Git — распределенная система контроля версий. Каждый разработчик имеет полную копию репозитория.

Основные операции Git:
• commit — фиксация изменений в локальном репозитории
• push — отправка изменений на удаленный сервер
• pull — получение изменений с удаленного сервера
• branch — создание независимой линии разработки
• merge — слияние изменений из разных веток

Ветка (branch) — это независимая линия разработки. Позволяет работать над новой функциональностью, не затрагивая основной код. После завершения работы ветка сливается (merge) с основной веткой.

Pull Request (PR) — это запрос на слияние изменений из одной ветки в другую. Позволяет провести код-ревью перед включением изменений в основную кодовую базу. Используется для контроля качества кода.

Разрешение конфликтов: когда два разработчика изменили одни и те же строки, нужно открыть файл с конфликтом, выбрать нужные изменения (или объединить их вручную), удалить маркеры конфликта и сделать commit.`
  },
  {
    id: 'architecture',
    title: 'Архитектура ПО',
    icon: 'Building2',
    content: `Архитектура ПО — это структура системы, включающая компоненты программного обеспечения, их свойства и связи между ними. Определяет, как система организована на высоком уровне.

Типы архитектур:

Монолитная архитектура — это подход, где всё приложение разработано как единый неделимый модуль. Все компоненты работают в одном процессе. Проще разрабатывать, но сложнее масштабировать.

Микросервисная архитектура — приложение разделено на независимые сервисы, каждый отвечает за свою функцию. Сервисы взаимодействуют через API. Легче масштабировать и поддерживать, но сложнее в разработке.

Слоистая архитектура делит систему на горизонтальные слои:
• Presentation (UI) — пользовательский интерфейс
• Business Logic — бизнес-логика приложения
• Data Access — работа с данными

Каждый слой взаимодействует только со смежными слоями, что упрощает тестирование и замену компонентов.

SOLID — пять принципов объектно-ориентированного программирования:
• Single Responsibility — единственная ответственность
• Open/Closed — открыт для расширения, закрыт для изменения
• Liskov Substitution — подстановка Лисков
• Interface Segregation — разделение интерфейсов
• Dependency Inversion — инверсия зависимостей`
  }
];

export default function Index() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [userName, setUserName] = useState('student123');
  const [userEmail, setUserEmail] = useState('');

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase();
    const results = articles.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.content.toLowerCase().includes(query)
    );

    setSearchResults(results);
    setCurrentView('search-results');
  };

  const openArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentView('article-view');
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
                      placeholder="Найти статью или тему..."
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
                  <p className="text-muted-foreground">Статьи по ключевым темам программной инженерии</p>
                </div>

                <div className="grid gap-6">
                  {articles.map((article) => (
                    <Card 
                      key={article.id} 
                      className="animate-scale-in hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => openArticle(article)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Icon name={article.icon as any} className="text-primary" size={24} />
                            </div>
                            <div>
                              <CardTitle className="hover:text-primary transition-colors">{article.title}</CardTitle>
                            </div>
                          </div>
                          <Icon name="ChevronRight" className="text-muted-foreground" size={20} />
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {currentView === 'article-view' && selectedArticle && (
              <div className="animate-fade-in space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <Button variant="ghost" size="icon" onClick={() => setCurrentView('topics')}>
                    <Icon name="ArrowLeft" size={20} />
                  </Button>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon name={selectedArticle.icon as any} className="text-primary" size={24} />
                    </div>
                    <h2 className="text-3xl font-bold">{selectedArticle.title}</h2>
                  </div>
                </div>

                <Card>
                  <CardContent className="pt-6">
                    <div className="prose prose-lg max-w-none">
                      {selectedArticle.content.split('\n').map((paragraph, idx) => (
                        paragraph.trim() && <p key={idx} className="mb-4 leading-relaxed">{paragraph}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentView === 'diagnostics' && (
              <div className="animate-fade-in space-y-6">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">Диагностика знаний</h2>
                  <p className="text-muted-foreground">Проверьте свои знания в программной инженерии</p>
                </div>

                <Card>
                  <CardContent className="py-16 text-center">
                    <Icon name="Brain" className="mx-auto mb-4 text-primary" size={56} />
                    <h3 className="text-xl font-semibold mb-2">Скоро здесь появятся тесты</h3>
                    <p className="text-muted-foreground">Мы работаем над созданием системы тестирования</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentView === 'profile' && (
              <div className="animate-fade-in space-y-6">
                <h2 className="text-3xl font-bold mb-8">Профиль</h2>

                <Card>
                  <CardHeader>
                    <CardTitle>Личная информация</CardTitle>
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
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Почта</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <Button>
                        <Icon name="Save" className="mr-2" size={16} />
                        Сохранить
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
                    {searchResults.map(article => (
                      <Card 
                        key={article.id} 
                        className="animate-scale-in cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => openArticle(article)}
                      >
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Icon name={article.icon as any} className="text-primary" size={24} />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="hover:text-primary transition-colors">{article.title}</CardTitle>
                            </div>
                            <Icon name="ChevronRight" className="text-muted-foreground" size={20} />
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-16 text-center">
                      <Icon name="SearchX" className="mx-auto mb-4 text-muted-foreground" size={56} />
                      <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
                      <p className="text-muted-foreground mb-6">Попробуйте изменить запрос или просмотрите все статьи</p>
                      <Button onClick={() => setCurrentView('topics')}>
                        <Icon name="BookOpen" className="mr-2" size={18} />
                        Посмотреть все статьи
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
