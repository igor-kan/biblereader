"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import {
  BookOpen,
  Search,
  Bookmark,
  MessageCircle,
  Heart,
  Share,
  Download,
  Settings,
  Play,
  Pause,
  Volume2,
  Languages,
  Lightbulb,
  Target,
  Calendar,
  Clock,
  Star,
  Quote,
  Link2,
  Brain,
  Zap,
  Users,
  Eye,
  Filter,
  ChevronRight,
  ChevronDown,
  Plus,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  BookMarked,
  History,
  TrendingUp,
  Globe,
  Headphones,
  Type,
  Palette,
  Moon,
  Sun,
  MapPin,
  FileText
} from "lucide-react"

interface BibleVerse {
  id: string
  book: string
  chapter: number
  verse: number
  text: string
  translation: string
  reference: string
  crossReferences: string[]
  commentary?: Commentary[]
  notes?: StudyNote[]
  highlights?: Highlight[]
}

interface Commentary {
  id: string
  author: string
  source: string
  text: string
  type: 'historical' | 'theological' | 'practical' | 'linguistic'
  date?: Date
  popularity: number
}

interface StudyNote {
  id: string
  content: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  created: Date
  modified?: Date
  tags: string[]
  isPrivate: boolean
  references: string[]
}

interface Highlight {
  id: string
  startVerse: string
  endVerse: string
  color: string
  note?: string
  created: Date
  tags: string[]
}

interface ReadingPlan {
  id: string
  name: string
  description: string
  duration: number // days
  passages: ReadingPlanPassage[]
  progress: number
  startDate: Date
  subscribers: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
}

interface ReadingPlanPassage {
  id: string
  day: number
  passages: string[]
  theme?: string
  reflection?: string
  questions?: string[]
}

interface StudyTopic {
  id: string
  name: string
  description: string
  verses: string[]
  difficulty: number
  estimatedTime: number
  category: string
  subtopics: string[]
  resources: StudyResource[]
}

interface StudyResource {
  id: string
  title: string
  type: 'video' | 'article' | 'audio' | 'book' | 'commentary'
  url?: string
  author: string
  duration?: number
  description: string
  rating: number
}

interface Translation {
  id: string
  name: string
  abbreviation: string
  language: string
  description: string
  year: number
  type: 'formal' | 'dynamic' | 'paraphrase'
  features: string[]
}

export default function EnhancedBibleStudy() {
  const [currentVerse, setCurrentVerse] = useState<BibleVerse>({
    id: '1',
    book: 'John',
    chapter: 3,
    verse: 16,
    text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
    translation: 'NIV',
    reference: 'John 3:16',
    crossReferences: ['Romans 5:8', '1 John 4:9', 'Romans 6:23', 'John 1:12'],
    commentary: [
      {
        id: '1',
        author: 'Matthew Henry',
        source: 'Matthew Henry Commentary',
        text: 'This verse encapsulates the entire gospel message. God\'s love is demonstrated through the giving of His Son, and the condition for eternal life is belief in Him.',
        type: 'theological',
        popularity: 95
      },
      {
        id: '2',
        author: 'John MacArthur',
        source: 'MacArthur Study Bible',
        text: 'The Greek word for "loved" (ēgapēsen) refers to God\'s unconditional, sacrificial love. This love is not based on human merit but on God\'s character.',
        type: 'linguistic',
        popularity: 88
      }
    ],
    notes: [
      {
        id: '1',
        content: 'This is the most famous verse in the Bible. Key themes: God\'s love, sacrifice, belief, eternal life.',
        author: { id: '1', name: 'Study User', avatar: '/placeholder.svg' },
        created: new Date('2024-01-20'),
        tags: ['love', 'salvation', 'eternal-life'],
        isPrivate: false,
        references: ['Romans 5:8']
      }
    ],
    highlights: [
      {
        id: '1',
        startVerse: 'John 3:16',
        endVerse: 'John 3:16',
        color: '#fbbf24',
        note: 'Central verse of Christianity',
        created: new Date('2024-01-15'),
        tags: ['key-verse']
      }
    ]
  })

  const [translations] = useState<Translation[]>([
    {
      id: '1',
      name: 'New International Version',
      abbreviation: 'NIV',
      language: 'English',
      description: 'Popular modern English translation balancing accuracy and readability',
      year: 2011,
      type: 'dynamic',
      features: ['Modern English', 'Scholarly accuracy', 'Easy to read']
    },
    {
      id: '2',
      name: 'English Standard Version',
      abbreviation: 'ESV',
      language: 'English',
      description: 'Formal equivalence translation emphasizing word-for-word accuracy',
      year: 2001,
      type: 'formal',
      features: ['Literal translation', 'Literary excellence', 'Theological precision']
    },
    {
      id: '3',
      name: 'New King James Version',
      abbreviation: 'NKJV',
      language: 'English',
      description: 'Modern update of the classic King James Version',
      year: 1982,
      type: 'formal',
      features: ['Traditional language updated', 'Textual accuracy', 'Familiar style']
    },
    {
      id: '4',
      name: 'The Message',
      abbreviation: 'MSG',
      language: 'English',
      description: 'Contemporary paraphrase in modern American English',
      year: 2002,
      type: 'paraphrase',
      features: ['Contemporary language', 'Thought-for-thought', 'Easy understanding']
    },
    {
      id: '5',
      name: 'New American Standard Bible',
      abbreviation: 'NASB',
      language: 'English',
      description: 'Literal translation known for accuracy and precision',
      year: 2020,
      type: 'formal',
      features: ['Word-for-word accuracy', 'Scholarly precision', 'Consistent translation']
    },
    {
      id: '6',
      name: 'Christian Standard Bible',
      abbreviation: 'CSB',
      language: 'English',
      description: 'Balance of accuracy and readability for modern readers',
      year: 2017,
      type: 'dynamic',
      features: ['Optimal equivalence', 'Clear communication', 'Faithful translation']
    },
    {
      id: '7',
      name: 'New Living Translation',
      abbreviation: 'NLT',
      language: 'English',
      description: 'Thought-for-thought translation in contemporary English',
      year: 2015,
      type: 'dynamic',
      features: ['Easy understanding', 'Contemporary language', 'Natural flow']
    },
    {
      id: '8',
      name: 'Amplified Bible',
      abbreviation: 'AMP',
      language: 'English',
      description: 'Expanded translation revealing multiple meanings and nuances',
      year: 2015,
      type: 'formal',
      features: ['Multiple word meanings', 'Detailed explanations', 'Linguistic depth']
    },
    {
      id: '9',
      name: 'King James Version',
      abbreviation: 'KJV',
      language: 'English',
      description: 'Historic English translation with traditional language',
      year: 1769,
      type: 'formal',
      features: ['Traditional English', 'Historical significance', 'Poetic beauty']
    },
    {
      id: '10',
      name: 'New English Translation',
      abbreviation: 'NET',
      language: 'English',
      description: 'Modern translation with extensive footnotes and commentary',
      year: 2019,
      type: 'formal',
      features: ['Extensive notes', 'Scholarly transparency', 'Modern language']
    }
  ])

  const [readingPlans] = useState<ReadingPlan[]>([
    {
      id: '1',
      name: 'Bible in a Year',
      description: 'Complete Bible reading plan covering all 66 books in 365 days',
      duration: 365,
      passages: [],
      progress: 45,
      startDate: new Date('2024-01-01'),
      subscribers: 12580,
      difficulty: 'intermediate',
      category: 'Complete Bible'
    },
    {
      id: '2',
      name: 'Gospels Deep Dive',
      description: 'Intensive study of Matthew, Mark, Luke, and John over 90 days',
      duration: 90,
      passages: [],
      progress: 78,
      startDate: new Date('2024-01-15'),
      subscribers: 4250,
      difficulty: 'beginner',
      category: 'New Testament'
    },
    {
      id: '3',
      name: 'Psalms & Wisdom Literature',
      description: 'Journey through Psalms, Proverbs, Ecclesiastes, and Job',
      duration: 120,
      passages: [],
      progress: 23,
      startDate: new Date('2024-02-01'),
      subscribers: 3150,
      difficulty: 'intermediate',
      category: 'Wisdom'
    }
  ])

  const [studyTopics] = useState<StudyTopic[]>([
    {
      id: '1',
      name: 'Love and Relationships',
      description: 'Biblical perspective on love, marriage, and relationships',
      verses: ['1 Corinthians 13:4-7', 'Ephesians 5:25-33', 'Song of Solomon 8:6-7', '1 John 4:7-21', 'Romans 12:9-21', 'Colossians 3:12-17'],
      difficulty: 3,
      estimatedTime: 45,
      category: 'Relationships',
      subtopics: ['Marital Love', 'Brotherly Love', 'God\'s Love', 'Forgiveness'],
      resources: [
        {
          id: '1',
          title: 'The Meaning of Marriage',
          type: 'book',
          author: 'Timothy Keller',
          description: 'Biblical perspective on marriage and relationships',
          rating: 4.6
        }
      ]
    },
    {
      id: '2',
      name: 'Faith and Trust in God',
      description: 'Understanding faith, trust, and reliance on God through difficult times',
      verses: ['Hebrews 11:1', 'Proverbs 3:5-6', 'Romans 1:17', 'James 1:2-4', 'Matthew 17:20', 'Mark 11:22-24', '2 Corinthians 5:7', 'Romans 10:17'],
      difficulty: 4,
      estimatedTime: 60,
      category: 'Spiritual Growth',
      subtopics: ['Definition of Faith', 'Testing of Faith', 'Growing in Faith', 'Faith vs Doubt'],
      resources: [
        {
          id: '2',
          title: 'Faith in Times of Trial',
          type: 'video',
          author: 'John Piper',
          duration: 35,
          description: 'Sermon on maintaining faith during difficulties',
          rating: 4.8
        }
      ]
    },
    {
      id: '3',
      name: 'Prayer and Worship',
      description: 'Learning to communicate with God through prayer and worship',
      verses: ['Matthew 6:9-13', '1 Thessalonians 5:16-18', 'Philippians 4:6-7', 'James 5:13-16', 'Psalm 145:18', 'John 4:23-24', 'Romans 12:1-2'],
      difficulty: 2,
      estimatedTime: 40,
      category: 'Spiritual Disciplines',
      subtopics: ['The Lord\'s Prayer', 'Continuous Prayer', 'Worship in Spirit', 'Intercession'],
      resources: [
        {
          id: '3',
          title: 'The Power of Prayer',
          type: 'article',
          author: 'R.A. Torrey',
          description: 'Classic teachings on effective prayer',
          rating: 4.7
        }
      ]
    },
    {
      id: '4',
      name: 'Hope and Encouragement',
      description: 'Finding hope and strength in God\'s promises during trials',
      verses: ['Romans 8:28', 'Jeremiah 29:11', 'Isaiah 40:28-31', 'Psalm 23', '2 Corinthians 4:16-18', 'Romans 15:13', 'Psalm 42:5', 'Lamentations 3:22-23'],
      difficulty: 2,
      estimatedTime: 35,
      category: 'Comfort',
      subtopics: ['God\'s Promises', 'Overcoming Depression', 'Future Hope', 'Divine Strength'],
      resources: [
        {
          id: '4',
          title: 'Hope When Life Hurts',
          type: 'book',
          author: 'Larry Crabb',
          description: 'Finding hope in the midst of suffering',
          rating: 4.5
        }
      ]
    },
    {
      id: '5',
      name: 'Wisdom and Decision Making',
      description: 'Seeking God\'s wisdom for life\'s important decisions',
      verses: ['Proverbs 3:5-6', 'James 1:5-6', 'Proverbs 27:17', 'Ecclesiastes 7:12', 'Proverbs 16:9', 'Isaiah 55:8-9', 'Psalm 119:105', 'Proverbs 19:21'],
      difficulty: 3,
      estimatedTime: 50,
      category: 'Practical Living',
      subtopics: ['Seeking Counsel', 'Divine Guidance', 'Practical Wisdom', 'Life Decisions'],
      resources: [
        {
          id: '5',
          title: 'Decision Making by the Book',
          type: 'audio',
          author: 'Haddon Robinson',
          duration: 45,
          description: 'Biblical principles for decision making',
          rating: 4.4
        }
      ]
    },
    {
      id: '6',
      name: 'Forgiveness and Grace',
      description: 'Understanding God\'s forgiveness and extending grace to others',
      verses: ['Ephesians 4:32', 'Matthew 6:14-15', 'Colossians 3:13', '1 John 1:9', 'Matthew 18:21-22', 'Romans 3:23-24', 'Ephesians 2:8-9', 'Psalm 103:12'],
      difficulty: 3,
      estimatedTime: 45,
      category: 'Grace',
      subtopics: ['God\'s Forgiveness', 'Forgiving Others', 'Grace vs Works', 'Mercy'],
      resources: [
        {
          id: '6',
          title: 'The Grace of God',
          type: 'commentary',
          author: 'Charles Spurgeon',
          description: 'Deep dive into God\'s amazing grace',
          rating: 4.9
        }
      ]
    },
    {
      id: '7',
      name: 'Salvation and Eternal Life',
      description: 'Understanding the gospel message and the gift of eternal life',
      verses: ['John 3:16', 'Romans 3:23', 'Romans 6:23', 'John 14:6', 'Acts 4:12', 'Ephesians 2:8-9', 'Romans 10:9-10', '1 John 5:11-13'],
      difficulty: 2,
      estimatedTime: 55,
      category: 'Gospel',
      subtopics: ['The Need for Salvation', 'Jesus as Savior', 'Assurance of Salvation', 'The Gospel'],
      resources: [
        {
          id: '7',
          title: 'The Gospel According to Jesus',
          type: 'book',
          author: 'John MacArthur',
          description: 'Clear presentation of the gospel message',
          rating: 4.8
        }
      ]
    },
    {
      id: '8',
      name: 'Christian Character and Virtues',
      description: 'Developing Christ-like character and spiritual virtues',
      verses: ['Galatians 5:22-23', '2 Peter 1:5-8', 'Philippians 4:8', 'Colossians 3:12-17', '1 Corinthians 13:4-7', 'Matthew 5:3-12', 'Romans 12:9-21'],
      difficulty: 4,
      estimatedTime: 60,
      category: 'Character Development',
      subtopics: ['Fruit of the Spirit', 'The Beatitudes', 'Virtue Development', 'Christ-likeness'],
      resources: [
        {
          id: '8',
          title: 'The Pursuit of Holiness',
          type: 'book',
          author: 'Jerry Bridges',
          description: 'Growing in spiritual maturity and holiness',
          rating: 4.7
        }
      ]
    },
    {
      id: '9',
      name: 'God\'s Providence and Sovereignty',
      description: 'Understanding God\'s control over all things and His divine plan',
      verses: ['Romans 8:28', 'Ephesians 1:11', 'Proverbs 16:9', 'Daniel 4:35', 'Isaiah 46:9-10', 'Job 42:2', 'Romans 11:33-36', 'Psalm 115:3'],
      difficulty: 5,
      estimatedTime: 70,
      category: 'Theology',
      subtopics: ['Divine Sovereignty', 'Human Responsibility', 'God\'s Will', 'Predestination'],
      resources: [
        {
          id: '9',
          title: 'The Sovereignty of God',
          type: 'book',
          author: 'A.W. Pink',
          description: 'Comprehensive study of God\'s sovereignty',
          rating: 4.6
        }
      ]
    },
    {
      id: '10',
      name: 'Service and Ministry',
      description: 'Called to serve God and others with our gifts and talents',
      verses: ['1 Peter 4:10-11', 'Ephesians 4:11-16', 'Romans 12:4-8', '1 Corinthians 12:4-7', 'Matthew 20:26-28', 'Galatians 5:13', 'Mark 10:43-44'],
      difficulty: 3,
      estimatedTime: 50,
      category: 'Service',
      subtopics: ['Spiritual Gifts', 'Servant Leadership', 'Ministry Calling', 'Body of Christ'],
      resources: [
        {
          id: '10',
          title: 'Spiritual Gifts Survey',
          type: 'article',
          author: 'C. Peter Wagner',
          description: 'Discovering and using your spiritual gifts',
          rating: 4.3
        }
      ]
    }
  ])

  const [activeTab, setActiveTab] = useState('study')
  const [currentTranslation, setCurrentTranslation] = useState('NIV')
  const [showCommentary, setShowCommentary] = useState(true)
  const [showCrossReferences, setShowCrossReferences] = useState(true)
  const [fontSize, setFontSize] = useState([16])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const [studySession, setStudySession] = useState({
    startTime: new Date(),
    versesRead: 12,
    notesCreated: 3,
    timeSpent: 25 // minutes
  })

  const getTranslationText = (translation: string) => {
    // In a real app, this would fetch from a Bible API
    const translations: Record<string, string> = {
      'NIV': 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
      'ESV': 'For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.',
      'NKJV': 'For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.',
      'MSG': 'This is how much God loved the world: He gave his Son, his one and only Son. And this is why: so that no one need be destroyed; by believing in him, anyone can have a whole and lasting life.'
    }
    return translations[translation] || translations['NIV']
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Bible Study Center</h1>
              <p className="text-gray-600 dark:text-gray-400">Advanced tools for in-depth Bible study and spiritual growth</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Select value={currentTranslation} onValueChange={setCurrentTranslation}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {translations.map((translation) => (
                    <SelectItem key={translation.id} value={translation.abbreviation}>
                      {translation.abbreviation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Preferences
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Verses Read Today</p>
                    <p className="text-2xl font-bold">{studySession.versesRead}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Study Time</p>
                    <p className="text-2xl font-bold">{studySession.timeSpent}m</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Notes Created</p>
                    <p className="text-2xl font-bold">{studySession.notesCreated}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Study Streak</p>
                    <p className="text-2xl font-bold">7 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="study">Study</TabsTrigger>
            <TabsTrigger value="plans">Reading Plans</TabsTrigger>
            <TabsTrigger value="topics">Study Topics</TabsTrigger>
            <TabsTrigger value="tools">Study Tools</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="study" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Bible Text */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        {currentVerse.reference} ({currentTranslation})
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Volume2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Verse Text */}
                      <div 
                        className="text-lg leading-relaxed p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        style={{ fontSize: `${fontSize[0]}px` }}
                      >
                        <sup className="text-sm text-gray-500 mr-1">{currentVerse.verse}</sup>
                        {getTranslationText(currentTranslation)}
                      </div>

                      {/* Font Size Control */}
                      <div className="flex items-center gap-4">
                        <Label className="text-sm">Font Size:</Label>
                        <div className="flex-1 max-w-xs">
                          <Slider
                            value={fontSize}
                            onValueChange={setFontSize}
                            min={12}
                            max={24}
                            step={1}
                            className="w-full"
                          />
                        </div>
                        <span className="text-sm text-gray-500">{fontSize[0]}px</span>
                      </div>

                      {/* Translation Comparison */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Translation Comparison</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {translations.slice(0, 3).map((translation) => (
                              <div key={translation.id} className="p-3 border rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <Badge variant="outline">{translation.abbreviation}</Badge>
                                  <span className="text-xs text-gray-500">{translation.year}</span>
                                </div>
                                <p className="text-sm">{getTranslationText(translation.abbreviation)}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Cross References */}
                      {showCrossReferences && (
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Link2 className="h-4 w-4" />
                              Cross References
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {currentVerse.crossReferences.map((ref, index) => (
                                <Button key={index} variant="outline" size="sm" className="text-sm">
                                  {ref}
                                  <ExternalLink className="h-3 w-3 ml-1" />
                                </Button>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Study Notes */}
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <MessageCircle className="h-4 w-4" />
                              Study Notes ({currentVerse.notes?.length || 0})
                            </CardTitle>
                            <Button size="sm">
                              <Plus className="h-4 w-4 mr-1" />
                              Add Note
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {currentVerse.notes?.map((note) => (
                              <div key={note.id} className="p-4 border rounded-lg">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <Avatar className="w-6 h-6">
                                      <AvatarImage src={note.author.avatar} />
                                      <AvatarFallback className="text-xs">{note.author.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium">{note.author.name}</span>
                                    <span className="text-xs text-gray-500">{note.created.toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex gap-1">
                                    <Button variant="ghost" size="sm">
                                      <Edit className="h-3 w-3" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                                <p className="text-sm mb-2">{note.content}</p>
                                <div className="flex flex-wrap gap-1">
                                  {note.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Commentary */}
                {showCommentary && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Brain className="h-4 w-4 text-purple-500" />
                        Commentary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-80">
                        <div className="space-y-4">
                          {currentVerse.commentary?.map((comment) => (
                            <div key={comment.id} className="p-3 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <p className="text-sm font-medium">{comment.author}</p>
                                  <p className="text-xs text-gray-500">{comment.source}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className={`text-xs ${
                                    comment.type === 'theological' ? 'bg-purple-100 text-purple-800' :
                                    comment.type === 'historical' ? 'bg-blue-100 text-blue-800' :
                                    comment.type === 'practical' ? 'bg-green-100 text-green-800' :
                                    'bg-orange-100 text-orange-800'
                                  }`}>
                                    {comment.type}
                                  </Badge>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs">{comment.popularity}</span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-300">{comment.text}</p>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                )}

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button className="w-full justify-start" variant="outline">
                        <Search className="h-4 w-4 mr-2" />
                        Search Bible
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <BookMarked className="h-4 w-4 mr-2" />
                        Word Study
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Globe className="h-4 w-4 mr-2" />
                        Maps & Context
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <History className="h-4 w-4 mr-2" />
                        Reading History
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Study Options */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Study Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-commentary">Show Commentary</Label>
                        <Switch
                          id="show-commentary"
                          checked={showCommentary}
                          onCheckedChange={setShowCommentary}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-cross-refs">Cross References</Label>
                        <Switch
                          id="show-cross-refs"
                          checked={showCrossReferences}
                          onCheckedChange={setShowCrossReferences}
                        />
                      </div>
                      <Separator />
                      <div>
                        <Label className="text-sm mb-2 block">Preferred Commentary Style</Label>
                        <Select defaultValue="balanced">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="academic">Academic</SelectItem>
                            <SelectItem value="devotional">Devotional</SelectItem>
                            <SelectItem value="balanced">Balanced</SelectItem>
                            <SelectItem value="practical">Practical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="plans" className="mt-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Reading Plans</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Custom Plan
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {readingPlans.map((plan) => (
                  <Card key={plan.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg mb-1">{plan.name}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={
                              plan.difficulty === 'beginner' ? 'text-green-700 border-green-200 bg-green-50' :
                              plan.difficulty === 'intermediate' ? 'text-yellow-700 border-yellow-200 bg-yellow-50' :
                              'text-red-700 border-red-200 bg-red-50'
                            }>
                              {plan.difficulty}
                            </Badge>
                            <Badge variant="secondary">{plan.category}</Badge>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{plan.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{plan.progress}%</span>
                          </div>
                          <Progress value={plan.progress} className="h-2" />
                        </div>

                        <div className="flex justify-between text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Duration: </span>
                            <span className="font-medium">{plan.duration} days</span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Subscribers: </span>
                            <span className="font-medium">{plan.subscribers.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {plan.progress > 0 ? (
                            <Button className="flex-1">Continue Reading</Button>
                          ) : (
                            <Button className="flex-1">Start Plan</Button>
                          )}
                          <Button variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="topics" className="mt-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Study Topics</h2>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Search topics..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                  <Button variant="outline">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {studyTopics.map((topic) => (
                  <Card key={topic.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg mb-2">{topic.name}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{topic.category}</Badge>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${i < topic.difficulty ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Est. {topic.estimatedTime} min</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{topic.description}</p>

                        <div>
                          <p className="text-sm font-medium mb-2">Key Verses:</p>
                          <div className="flex flex-wrap gap-1">
                            {topic.verses.slice(0, 3).map((verse, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {verse}
                              </Badge>
                            ))}
                            {topic.verses.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{topic.verses.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Subtopics:</p>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {topic.subtopics.join(' • ')}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Resources ({topic.resources.length}):</p>
                          <div className="space-y-1">
                            {topic.resources.slice(0, 2).map((resource) => (
                              <div key={resource.id} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                                  <span>{resource.title}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span>{resource.rating}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button className="w-full">Start Topic Study</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-blue-500" />
                    Advanced Search
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Search by keywords, phrases, Strong's numbers, or themes across multiple translations.
                    </p>
                    <Button className="w-full">Open Search Tool</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-green-500" />
                    Biblical Atlas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Interactive maps showing biblical locations, journeys, and historical contexts.
                    </p>
                    <Button className="w-full">Explore Maps</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-500" />
                    Word Study Tool
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Deep dive into Hebrew and Greek words with Strong's concordance and etymology.
                    </p>
                    <Button className="w-full">Start Word Study</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Headphones className="h-5 w-5 text-orange-500" />
                    Audio Bible
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Listen to professional narrations in multiple languages and voices.
                    </p>
                    <Button className="w-full">Audio Player</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-indigo-500" />
                    Study Groups
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Join or create study groups for collaborative Bible study and discussion.
                    </p>
                    <Button className="w-full">Find Groups</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-red-500" />
                    Biblical Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Track biblical holidays, feast days, and historical events with context.
                    </p>
                    <Button className="w-full">View Calendar</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="mt-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Study Progress & Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">89</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Books Read</p>
                      </div>
                      <BookOpen className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-green-600">1,247</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Chapters Read</p>
                      </div>
                      <FileText className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-purple-600">156</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Study Notes</p>
                      </div>
                      <MessageCircle className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-orange-600">42h</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Study Time</p>
                      </div>
                      <Clock className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reading Plan Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {readingPlans.filter(plan => plan.progress > 0).map((plan) => (
                        <div key={plan.id}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">{plan.name}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{plan.progress}%</span>
                          </div>
                          <Progress value={plan.progress} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Study Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <Trophy className="h-8 w-8 text-yellow-600" />
                        <div>
                          <p className="font-medium">Bible Scholar</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Completed 10 study topics</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <BookOpen className="h-8 w-8 text-blue-600" />
                        <div>
                          <p className="font-medium">Faithful Reader</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">30-day reading streak</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <MessageCircle className="h-8 w-8 text-green-600" />
                        <div>
                          <p className="font-medium">Note Taker</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Created 100+ study notes</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}