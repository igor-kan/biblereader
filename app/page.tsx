"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Play,
  Pause,
  Settings,
  MessageCircle,
  Quote,
  Share,
  Bookmark,
  Network,
  Palette,
  Book,
  User,
  Moon,
  Sun,
  Volume2,
  SkipBack,
  SkipForward,
  Download,
  Heart,
  Maximize2,
  Languages,
  BookOpen,
  Calendar,
  Headphones,
  Type,
  Accessibility,
  FileText,
  Search,
  Star,
  ThumbsUp,
  Reply,
  Copy,
  Users,
  Eye,
  Grid,
  List,
} from "lucide-react"

// Comprehensive Bible translations
const bibleTranslations = {
  // English
  kjv: { name: "King James Version", language: "English", year: 1611, code: "en" },
  esv: { name: "English Standard Version", language: "English", year: 2001, code: "en" },
  niv: { name: "New International Version", language: "English", year: 1978, code: "en" },
  nlt: { name: "New Living Translation", language: "English", year: 1996, code: "en" },
  nasb: { name: "New American Standard Bible", language: "English", year: 1971, code: "en" },
  nrsv: { name: "New Revised Standard Version", language: "English", year: 1989, code: "en" },

  // Original Languages
  hebrew: { name: "Hebrew Masoretic Text", language: "Hebrew", year: "~1000 CE", code: "he" },
  greek: { name: "Greek New Testament (NA28)", language: "Greek", year: "2012", code: "el" },
  septuagint: { name: "Septuagint (LXX)", language: "Greek", year: "~250 BCE", code: "el" },
  vulgate: { name: "Latin Vulgate", language: "Latin", year: "405 CE", code: "la" },

  // Spanish
  "reina-valera": { name: "Reina-Valera 1960", language: "Spanish", year: 1960, code: "es" },
  "nueva-version": { name: "Nueva Versión Internacional", language: "Spanish", year: 1999, code: "es" },

  // French
  "louis-segond": { name: "Louis Segond 1910", language: "French", year: 1910, code: "fr" },
  "bible-semeur": { name: "Bible du Semeur", language: "French", year: 1992, code: "fr" },

  // German
  luther: { name: "Luther Bible", language: "German", year: 1545, code: "de" },
  elberfelder: { name: "Elberfelder Bible", language: "German", year: 1871, code: "de" },

  // Other Languages
  synodal: { name: "Russian Synodal", language: "Russian", year: 1876, code: "ru" },
  chinese: { name: "Chinese Union Version", language: "Chinese", year: 1919, code: "zh" },
  korean: { name: "Korean Revised Version", language: "Korean", year: 1961, code: "ko" },
  portuguese: { name: "Almeida Revista", language: "Portuguese", year: 1969, code: "pt" },
}

// Sample Bible data with comprehensive verse information
const sampleChapter = {
  book: "John",
  chapter: 3,
  verses: [
    {
      number: 14,
      translations: {
        kjv: "And as Moses lifted up the serpent in the wilderness, even so must the Son of man be lifted up:",
        esv: "And as Moses lifted up the serpent in the wilderness, so must the Son of Man be lifted up,",
        niv: "Just as Moses lifted up the snake in the wilderness, so the Son of Man must be lifted up,",
        hebrew: "וְכַאֲשֶׁר הֵרִים מֹשֶׁה אֶת־הַנָּחָשׁ בַּמִּדְבָּר כֵּן יָרוּם בֶּן־הָאָדָם׃",
        greek: "καὶ καθὼς Μωϋσῆς ὕψωσεν τὸν ὄφιν ἐν τῇ ἐρήμῳ, οὕτως ὑψωθῆναι δεῖ τὸν υἱὸν τοῦ ἀνθρώπου,",
        "reina-valera":
          "Y como Moisés levantó la serpiente en el desierto, así es necesario que el Hijo del Hombre sea levantado,",
        "louis-segond":
          "Et comme Moïse éleva le serpent dans le désert, il faut de même que le Fils de l'homme soit élevé,",
      },
      strongsNumbers: ["G2532", "G2531", "G3475", "G5312", "G3789", "G1722", "G2048"],
      connections: ["numbers-21-9", "john-12-32", "john-8-28", "isaiah-52-13"],
      themes: ["salvation", "typology", "crucifixion", "prophecy"],
      crossReferences: [
        { reference: "Numbers 21:9", relationship: "typological", strength: 0.9 },
        { reference: "John 12:32", relationship: "thematic", strength: 0.8 },
        { reference: "John 8:28", relationship: "prophetic", strength: 0.7 },
      ],
    },
    {
      number: 15,
      translations: {
        kjv: "That whosoever believeth in him should not perish, but have eternal life.",
        esv: "that whoever believes in him may have eternal life.",
        niv: "that everyone who believes may have eternal life in him.",
        hebrew: "לְמַעַן כָּל־הַמַּאֲמִין בּוֹ לֹא יֹאבַד כִּי אִם־יִהְיֶה־לּוֹ חַיֵּי עוֹלָם׃",
        greek: "ἵνα πᾶς ὁ πιστεύων ἐν αὐτῷ ἔχῃ ζωὴν αἰώνιον.",
        "reina-valera": "para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
        "louis-segond": "afin que quiconque croit en lui ait la vie éternelle.",
      },
      strongsNumbers: ["G2443", "G3956", "G4100", "G1722", "G846", "G2192", "G2222", "G166"],
      connections: ["john-3-36", "john-5-24", "john-6-47", "romans-10-9"],
      themes: ["faith", "eternal-life", "salvation", "belief"],
      crossReferences: [
        { reference: "John 3:36", relationship: "parallel", strength: 0.9 },
        { reference: "John 5:24", relationship: "thematic", strength: 0.8 },
        { reference: "Romans 10:9", relationship: "doctrinal", strength: 0.7 },
      ],
    },
    {
      number: 16,
      translations: {
        kjv: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
        esv: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
        niv: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
        hebrew: "כִּי־כֹה אָהַב אֱלֹהִים אֶת־הָעוֹלָם אֲשֶׁר נָתַן אֶת־בְּנוֹ יְחִידוֹ לְמַעַן כָּל־הַמַּאֲמִין בּוֹ לֹא יֹאבַד כִּי אִם־יִהְיֶה־לּוֹ חַיֵּי עוֹלָם׃",
        greek:
          "οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον, ὥστε τὸν υἱὸν τὸν μονογενῆ ἔδωκεν, ἵνα πᾶς ὁ πιστεύων εἰς αὐτὸν μὴ ἀπόληται ἀλλὰ ἔχῃ ζωὴν αἰώνιον.",
        "reina-valera":
          "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
        "louis-segond":
          "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
      },
      strongsNumbers: ["G3779", "G1063", "G25", "G2316", "G2889", "G5620", "G5207", "G3439", "G1325"],
      connections: ["romans-5-8", "1-john-4-9", "john-1-12", "romans-8-32", "ephesians-2-4"],
      themes: ["love", "sacrifice", "salvation", "eternal-life", "grace"],
      crossReferences: [
        { reference: "Romans 5:8", relationship: "parallel", strength: 0.95 },
        { reference: "1 John 4:9", relationship: "thematic", strength: 0.9 },
        { reference: "Romans 8:32", relationship: "doctrinal", strength: 0.85 },
      ],
      artwork: [
        {
          id: 1,
          type: "painting",
          title: "The Light of the World",
          artist: "William Holman Hunt",
          year: 1853,
          period: "Victorian",
          culture: "British",
          medium: "Oil on canvas",
          url: "/placeholder.svg?height=400&width=300&text=Light+of+World",
          description:
            "Christ knocking at the door of the human heart, symbolizing God's love reaching out to humanity",
          tags: ["love", "salvation", "divine", "symbolism"],
          popularity: 95,
          emotionalTone: "hopeful",
          genre: "religious",
        },
        {
          id: 2,
          type: "music",
          title: "Amazing Grace",
          artist: "John Newton",
          year: 1772,
          period: "18th Century",
          culture: "British",
          medium: "Hymn",
          url: "/placeholder.svg?height=400&width=300&text=Amazing+Grace",
          description: "Hymn about God's unmerited favor and transforming love",
          tags: ["grace", "salvation", "transformation", "worship"],
          popularity: 98,
          emotionalTone: "grateful",
          genre: "hymn",
        },
        {
          id: 3,
          type: "literature",
          title: "Paradise Lost",
          artist: "John Milton",
          year: 1667,
          period: "17th Century",
          culture: "British",
          medium: "Epic poem",
          url: "/placeholder.svg?height=400&width=300&text=Paradise+Lost",
          description: "Epic poem exploring themes of fall, redemption, and divine love",
          tags: ["redemption", "fall", "divine-love", "epic"],
          popularity: 85,
          emotionalTone: "contemplative",
          genre: "epic-poetry",
        },
        {
          id: 4,
          type: "sculpture",
          title: "Pietà",
          artist: "Michelangelo",
          year: 1499,
          period: "Renaissance",
          culture: "Italian",
          medium: "Marble",
          url: "/placeholder.svg?height=400&width=300&text=Pieta",
          description: "Mary holding the dead body of Jesus, expressing divine love through sacrifice",
          tags: ["sacrifice", "love", "sorrow", "divine"],
          popularity: 92,
          emotionalTone: "sorrowful",
          genre: "religious-sculpture",
        },
        {
          id: 5,
          type: "film",
          title: "The Passion of the Christ",
          artist: "Mel Gibson",
          year: 2004,
          period: "Contemporary",
          culture: "American",
          medium: "Film",
          url: "/placeholder.svg?height=400&width=300&text=Passion+Christ",
          description: "Cinematic portrayal of Christ's sacrifice demonstrating God's love",
          tags: ["sacrifice", "love", "passion", "redemption"],
          popularity: 88,
          emotionalTone: "intense",
          genre: "religious-drama",
        },
        {
          id: 6,
          type: "architecture",
          title: "Sagrada Familia",
          artist: "Antoni Gaudí",
          year: 1882,
          period: "Modern",
          culture: "Spanish",
          medium: "Architecture",
          url: "/placeholder.svg?height=400&width=300&text=Sagrada+Familia",
          description: "Basilica designed to express the glory and love of God through architectural beauty",
          tags: ["divine-glory", "worship", "beauty", "sacred"],
          popularity: 90,
          emotionalTone: "awe-inspiring",
          genre: "sacred-architecture",
        },
      ],
      commentaries: [
        {
          id: 1,
          author: "Thomas Aquinas",
          discipline: "theological",
          text: "This verse reveals the perfect harmony between divine justice and mercy, showing how God's love motivates the ultimate sacrifice. The word 'so' (οὕτως) indicates not merely the degree but the manner of God's love - it is sacrificial, costly, and redemptive.",
          period: "Medieval",
          tradition: "Catholic",
          year: 1265,
          rating: 4.8,
          likes: 156,
        },
        {
          id: 2,
          author: "John Calvin",
          discipline: "theological",
          text: "The word 'world' here signifies the whole human race, demonstrating the universality of God's love and the sufficiency of Christ's atonement. This love is not based on human merit but flows from God's sovereign grace.",
          period: "Reformation",
          tradition: "Reformed",
          year: 1559,
          rating: 4.7,
          likes: 142,
        },
        {
          id: 3,
          author: "Søren Kierkegaard",
          discipline: "philosophical",
          text: "This verse presents the paradox of divine love - that the infinite would concern itself with the finite, the eternal with the temporal. It challenges us to move beyond mere intellectual assent to passionate, personal faith.",
          period: "19th Century",
          tradition: "Existentialist",
          year: 1843,
          rating: 4.6,
          likes: 98,
        },
        {
          id: 4,
          author: "Augustine of Hippo",
          discipline: "theological",
          text: "In this verse we see the Trinity at work: the Father's love, the Son's sacrifice, and the Spirit's work in bringing faith. The love of God is both the source and the goal of our salvation.",
          period: "Patristic",
          tradition: "Catholic",
          year: 400,
          rating: 4.9,
          likes: 203,
        },
        {
          id: 5,
          author: "N.T. Wright",
          discipline: "historical",
          text: "Understanding this verse requires grasping the first-century Jewish context of covenant love and the expectation of divine intervention. John presents Jesus as the fulfillment of Israel's hopes.",
          period: "Contemporary",
          tradition: "Anglican",
          year: 2002,
          rating: 4.5,
          likes: 87,
        },
        {
          id: 6,
          author: "Robert Alter",
          discipline: "literary",
          text: "The literary structure here employs a chiastic pattern that emphasizes the central theme of divine love and human response. The repetition of 'whoever believes' creates a universal invitation.",
          period: "Contemporary",
          tradition: "Literary",
          year: 2018,
          rating: 4.4,
          likes: 76,
        },
        {
          id: 7,
          author: "Origen",
          discipline: "translational",
          text: "The Greek term 'monogenēs' (only begotten) emphasizes the unique relationship between Father and Son. This is not about temporal generation but eternal relationship within the Godhead.",
          period: "Patristic",
          tradition: "Eastern",
          year: 230,
          rating: 4.3,
          likes: 65,
        },
      ],
    },
    {
      number: 17,
      translations: {
        kjv: "For God sent not his Son into the world to condemn the world; but that the world through him might be saved.",
        esv: "For God did not send his Son into the world to condemn the world, but in order that the world might be saved through him.",
        niv: "For God did not send his Son into the world to condemn the world, but to save the world through him.",
        hebrew: "כִּי לֹא־שָׁלַח אֱלֹהִים אֶת־בְּנוֹ אֶל־הָעוֹלָם לְהַרְשִׁיעַ אֶת־הָעוֹלָם כִּי אִם־לְהוֹשִׁיעַ אֶת־הָעוֹלָם עַל־יָדוֹ׃",
        greek:
          "οὐ γὰρ ἀπέστειλεν ὁ θεὸς τὸν υἱὸν εἰς τὸν κόσμον ἵνα κρίνῃ τὸν κόσμον, ἀλλὰ ἵνα σωθῇ ὁ κόσμος δι' αὐτοῦ.",
        "reina-valera":
          "Porque no envió Dios a su Hijo al mundo para condenar al mundo, sino para que el mundo sea salvo por él.",
        "louis-segond":
          "Dieu, en effet, n'a pas envoyé son Fils dans le monde pour qu'il juge le monde, mais pour que le monde soit sauvé par lui.",
      },
      strongsNumbers: ["G3756", "G1063", "G649", "G2316", "G5207", "G1519", "G2889", "G2919"],
      connections: ["john-12-47", "luke-9-56", "1-john-4-14", "john-5-22"],
      themes: ["salvation", "mission", "grace", "purpose"],
      crossReferences: [
        { reference: "John 12:47", relationship: "parallel", strength: 0.9 },
        { reference: "Luke 9:56", relationship: "thematic", strength: 0.7 },
        { reference: "1 John 4:14", relationship: "doctrinal", strength: 0.8 },
      ],
    },
  ],
}

// Strong's Concordance data
const strongsConcordance = {
  G25: {
    word: "ἀγαπάω",
    transliteration: "agapao",
    meaning: "to love, have affection for",
    definition: "Divine, unconditional love",
  },
  G2316: { word: "θεός", transliteration: "theos", meaning: "God, deity", definition: "The supreme divine being" },
  G2889: {
    word: "κόσμος",
    transliteration: "kosmos",
    meaning: "world, universe, mankind",
    definition: "The ordered universe, humanity",
  },
  G5207: { word: "υἱός", transliteration: "huios", meaning: "son, descendant", definition: "Male offspring, heir" },
  G3439: {
    word: "μονογενής",
    transliteration: "monogenes",
    meaning: "only begotten, unique",
    definition: "One of a kind, unique",
  },
  G1325: { word: "δίδωμι", transliteration: "didomi", meaning: "to give, grant", definition: "To give freely, bestow" },
  G4100: {
    word: "πιστεύω",
    transliteration: "pisteuo",
    meaning: "to believe, trust",
    definition: "To have faith, trust in",
  },
  G2222: { word: "ζωή", transliteration: "zoe", meaning: "life", definition: "Life, both physical and spiritual" },
  G166: {
    word: "αἰώνιος",
    transliteration: "aionios",
    meaning: "eternal, everlasting",
    definition: "Without beginning or end",
  },
}

// Quote backgrounds
const quoteBackgrounds = [
  { id: 1, name: "Sunset", url: "/placeholder.svg?height=600&width=800&text=Sunset+Background", category: "nature" },
  {
    id: 2,
    name: "Mountains",
    url: "/placeholder.svg?height=600&width=800&text=Mountain+Background",
    category: "nature",
  },
  { id: 3, name: "Ocean", url: "/placeholder.svg?height=600&width=800&text=Ocean+Background", category: "nature" },
  { id: 4, name: "Forest", url: "/placeholder.svg?height=600&width=800&text=Forest+Background", category: "nature" },
  { id: 5, name: "Desert", url: "/placeholder.svg?height=600&width=800&text=Desert+Background", category: "nature" },
  {
    id: 6,
    name: "Stained Glass",
    url: "/placeholder.svg?height=600&width=800&text=Stained+Glass",
    category: "religious",
  },
  {
    id: 7,
    name: "Ancient Scroll",
    url: "/placeholder.svg?height=600&width=800&text=Ancient+Scroll",
    category: "religious",
  },
  { id: 8, name: "Cathedral", url: "/placeholder.svg?height=600&width=800&text=Cathedral", category: "religious" },
  { id: 9, name: "Minimalist", url: "/placeholder.svg?height=600&width=800&text=Minimalist", category: "modern" },
  { id: 10, name: "Gradient", url: "/placeholder.svg?height=600&width=800&text=Gradient", category: "modern" },
]

// User profile data
const userProfile = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/placeholder.svg?height=100&width=100&text=JD",
  joinDate: "2023-01-15",
  readingStreak: 45,
  versesRead: 1250,
  commentsPosted: 23,
  bookmarkedVerses: 156,
  studyGroups: ["Morning Devotions", "Theology Study", "Youth Group"],
  preferences: {
    defaultTranslation: "esv",
    fontSize: 16,
    darkMode: false,
    showOriginalText: true,
    dyslexiaFriendly: false,
    autoplay: false,
    narrationSpeed: 1.0,
    narrationVoice: "male-1",
  },
}

export default function Scriptura() {
  // State management
  const [selectedTranslation, setSelectedTranslation] = useState("kjv")
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null)
  const [selectedVerses, setSelectedVerses] = useState<number[]>([])
  const [showSettings, setShowSettings] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showQuoteDialog, setShowQuoteDialog] = useState(false)
  const [showExpandedView, setShowExpandedView] = useState(false)
  const [showGraphView, setShowGraphView] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState([1])
  const [volume, setVolume] = useState([80])
  const [fontSize, setFontSize] = useState([16])
  const [isDyslexiaFriendly, setIsDyslexiaFriendly] = useState(false)
  const [showOriginalText, setShowOriginalText] = useState(false)
  const [artworkFilter, setArtworkFilter] = useState("all")
  const [artworkSort, setArtworkSort] = useState("popularity")
  const [artworkView, setArtworkView] = useState("grid")
  const [commentaryFilter, setCommentaryFilter] = useState("all")
  const [commentarySort, setCommentarySort] = useState("rating")
  const [newComment, setNewComment] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedQuoteBackground, setSelectedQuoteBackground] = useState(1)
  const [quoteText, setQuoteText] = useState("")
  const [batchQuoteMode, setBatchQuoteMode] = useState(false)
  const [narrationVoice, setNarrationVoice] = useState("male-1")
  const [autoScroll, setAutoScroll] = useState(false)
  const [showBookmarks, setShowBookmarks] = useState(false)
  const [bookmarkedVerses, setBookmarkedVerses] = useState<number[]>([16])

  // Comments state
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Dr. Sarah Thompson",
      avatar: "/placeholder.svg?height=40&width=40&text=ST",
      text: "The Greek word 'agapao' here represents unconditional, sacrificial love - distinct from eros or philos. This divine love is the foundation of our salvation.",
      timestamp: "2 hours ago",
      likes: 24,
      replies: [
        {
          id: 11,
          user: "Michael Chen",
          avatar: "/placeholder.svg?height=40&width=40&text=MC",
          text: "Thank you for that insight! The distinction between types of love in Greek is so important for understanding this passage.",
          timestamp: "1 hour ago",
          likes: 8,
        },
      ],
      verified: true,
      verse: 16,
    },
    {
      id: 2,
      user: "Pastor David Kim",
      avatar: "/placeholder.svg?height=40&width=40&text=DK",
      text: "This verse has been a cornerstone of Christian theology for centuries. The parallel with the bronze serpent in verse 14 is particularly profound - both point to salvation through looking to God's provision.",
      timestamp: "1 day ago",
      likes: 18,
      replies: [],
      verified: true,
      verse: 16,
    },
    {
      id: 3,
      user: "Emma Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40&text=ER",
      text: "I love how this verse shows both God's love AND His justice. He doesn't just overlook sin - He provides a way for it to be dealt with through Christ's sacrifice.",
      timestamp: "2 days ago",
      likes: 15,
      replies: [],
      verified: false,
      verse: 16,
    },
  ])

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // Helper functions
  const currentVerse = selectedVerse ? sampleChapter.verses.find((v) => v.number === selectedVerse) : null
  const currentText = currentVerse?.translations?.[selectedTranslation as keyof typeof currentVerse.translations] || ""

  const getOriginalText = () => {
    if (!currentVerse?.translations) return ""
    const translation = bibleTranslations[selectedTranslation as keyof typeof bibleTranslations]
    if (translation?.language === "Hebrew") return currentVerse.translations.hebrew || ""
    if (translation?.language === "Greek") return currentVerse.translations.greek || ""
    return currentVerse.translations.hebrew || currentVerse.translations.greek || ""
  }

  const sortArtwork = (artwork: any[]) => {
    return [...artwork].sort((a, b) => {
      switch (artworkSort) {
        case "popularity":
          return b.popularity - a.popularity
        case "year":
          return b.year - a.year
        case "title":
          return a.title.localeCompare(b.title)
        case "artist":
          return a.artist.localeCompare(b.artist)
        default:
          return 0
      }
    })
  }

  const filteredArtwork = currentVerse?.artwork
    ? sortArtwork(currentVerse.artwork.filter((art) => artworkFilter === "all" || art.type === artworkFilter))
    : []

  const sortCommentaries = (commentaries: any[]) => {
    return [...commentaries].sort((a, b) => {
      switch (commentarySort) {
        case "rating":
          return b.rating - a.rating
        case "likes":
          return b.likes - a.likes
        case "year":
          return b.year - a.year
        case "author":
          return a.author.localeCompare(b.author)
        default:
          return 0
      }
    })
  }

  const filteredCommentaries = currentVerse?.commentaries
    ? sortCommentaries(
        currentVerse.commentaries.filter(
          (commentary) => commentaryFilter === "all" || commentary.discipline === commentaryFilter,
        ),
      )
    : []

  const filteredComments = comments.filter((comment) => comment.verse === selectedVerse)

  // Event handlers
  const handleVerseClick = (verseNumber: number) => {
    if (batchQuoteMode) {
      setSelectedVerses((prev) =>
        prev.includes(verseNumber) ? prev.filter((v) => v !== verseNumber) : [...prev, verseNumber],
      )
    } else {
      setSelectedVerse(verseNumber)
    }
  }

  const handleExpandedView = () => {
    setShowExpandedView(true)
  }

  const handleAddComment = () => {
    if (newComment.trim() && selectedVerse) {
      const comment = {
        id: comments.length + 1,
        user: userProfile.name,
        avatar: userProfile.avatar,
        text: newComment,
        timestamp: "Just now",
        likes: 0,
        replies: [],
        verified: false,
        verse: selectedVerse,
      }
      setComments([comment, ...comments])
      setNewComment("")
    }
  }

  const handleBookmark = (verseNumber: number) => {
    setBookmarkedVerses((prev) =>
      prev.includes(verseNumber) ? prev.filter((v) => v !== verseNumber) : [...prev, verseNumber],
    )
  }

  const generateQuote = () => {
    if (batchQuoteMode && selectedVerses.length > 0) {
      const verses = selectedVerses
        .map((num) => {
          const verse = sampleChapter.verses.find((v) => v.number === num)
          const text = verse?.translations[selectedTranslation as keyof typeof verse.translations]
          return `${num}. ${text}`
        })
        .join("\n\n")
      setQuoteText(`${verses}\n\n- ${sampleChapter.book} ${sampleChapter.chapter}:${selectedVerses.join(", ")}`)
    } else if (currentVerse) {
      setQuoteText(`"${currentText}"\n\n- ${sampleChapter.book} ${sampleChapter.chapter}:${selectedVerse}`)
    }
    setShowQuoteDialog(true)
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    // Audio playback logic would go here
  }

  const handleLikeComment = (commentId: number) => {
    setComments((prev) =>
      prev.map((comment) => (comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment)),
    )
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-background text-foreground">
        {/* Header */}
        <header className="border-b bg-card shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Book className="h-8 w-8 text-primary" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Scriptura
                    </h1>
                    <p className="text-xs text-muted-foreground">
                      More than words. A universe of meaning—verse by verse.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search verses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>

                {/* Translation Selector */}
                <div className="flex items-center space-x-2">
                  <Languages className="h-4 w-4 text-muted-foreground" />
                  <Select value={selectedTranslation} onValueChange={setSelectedTranslation}>
                    <SelectTrigger className="w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(bibleTranslations).map(([key, translation]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center justify-between w-full">
                            <span>{translation.name}</span>
                            <Badge variant="outline" className="ml-2 text-xs">
                              {translation.language}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Action Buttons */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setBatchQuoteMode(!batchQuoteMode)}
                  className={batchQuoteMode ? "bg-primary text-primary-foreground" : ""}
                >
                  <Quote className="h-4 w-4" />
                </Button>

                <Button variant="outline" size="icon" onClick={() => setShowBookmarks(!showBookmarks)}>
                  <Bookmark className="h-4 w-4" />
                </Button>

                <Button variant="outline" size="icon" onClick={() => setShowGraphView(true)}>
                  <Network className="h-4 w-4" />
                </Button>

                <Button variant="outline" size="icon" onClick={() => setShowSettings(true)}>
                  <Settings className="h-4 w-4" />
                </Button>

                <Button variant="outline" size="icon" onClick={() => setShowProfile(true)}>
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Chapter View */}
            <div className="lg:col-span-3 space-y-6">
              {/* Chapter Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">
                        {sampleChapter.book} {sampleChapter.chapter}
                      </CardTitle>
                      <p className="text-muted-foreground">
                        {bibleTranslations[selectedTranslation as keyof typeof bibleTranslations].name}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Reading Plan
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      {batchQuoteMode && (
                        <Button onClick={generateQuote} disabled={selectedVerses.length === 0}>
                          <Quote className="h-4 w-4 mr-2" />
                          Quote Selected ({selectedVerses.length})
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Audio Controls */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Button variant="outline" size="icon">
                        <SkipBack className="h-4 w-4" />
                      </Button>
                      <Button onClick={handlePlayPause} size="icon">
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" size="icon">
                        <SkipForward className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center space-x-2">
                        <Headphones className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Chapter 3</span>
                      </div>
                      <Select value={narrationVoice} onValueChange={setNarrationVoice}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male-1">Male Voice 1</SelectItem>
                          <SelectItem value="male-2">Male Voice 2</SelectItem>
                          <SelectItem value="female-1">Female Voice 1</SelectItem>
                          <SelectItem value="female-2">Female Voice 2</SelectItem>
                          <SelectItem value="dramatic">Dramatic</SelectItem>
                          <SelectItem value="meditative">Meditative</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Volume2 className="h-4 w-4" />
                        <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="w-20" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">Speed:</span>
                        <Slider
                          value={playbackSpeed}
                          onValueChange={setPlaybackSpeed}
                          min={0.5}
                          max={2}
                          step={0.1}
                          className="w-20"
                        />
                        <span className="text-sm">{playbackSpeed[0]}x</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="auto-scroll" className="text-sm">
                          Auto-scroll
                        </Label>
                        <Switch id="auto-scroll" checked={autoScroll} onCheckedChange={setAutoScroll} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Chapter Text */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {sampleChapter.verses.map((verse) => (
                      <div
                        key={verse.number}
                        className={`group cursor-pointer p-4 rounded-lg transition-all duration-200 ${
                          selectedVerse === verse.number
                            ? "bg-primary/10 border-l-4 border-primary"
                            : batchQuoteMode && selectedVerses.includes(verse.number)
                              ? "bg-secondary/50 border-l-4 border-secondary"
                              : "hover:bg-muted/50"
                        }`}
                        onClick={() => handleVerseClick(verse.number)}
                        style={{ fontSize: `${fontSize[0]}px` }}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="mt-1 text-xs">
                              {verse.number}
                            </Badge>
                            {batchQuoteMode && (
                              <Checkbox
                                checked={selectedVerses.includes(verse.number)}
                                onChange={() => handleVerseClick(verse.number)}
                              />
                            )}
                            {bookmarkedVerses.includes(verse.number) && (
                              <Bookmark className="h-4 w-4 text-primary fill-current" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className={`leading-relaxed ${isDyslexiaFriendly ? "font-mono" : ""}`}>
                              {verse.translations[selectedTranslation as keyof typeof verse.translations]}
                            </p>

                            {showOriginalText && (
                              <p className="mt-2 text-sm text-muted-foreground italic" dir="rtl">
                                {verse.translations.hebrew || verse.translations.greek}
                              </p>
                            )}

                            {selectedVerse === verse.number && !batchQuoteMode && (
                              <div className="mt-3 flex items-center space-x-2 flex-wrap gap-2">
                                <Button size="sm" variant="outline" onClick={handleExpandedView}>
                                  <Maximize2 className="h-3 w-3 mr-1" />
                                  Expand
                                </Button>
                                <Button size="sm" variant="outline" onClick={generateQuote}>
                                  <Quote className="h-3 w-3 mr-1" />
                                  Quote
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Share className="h-3 w-3 mr-1" />
                                  Share
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleBookmark(verse.number)}
                                  className={bookmarkedVerses.includes(verse.number) ? "text-primary" : ""}
                                >
                                  <Bookmark className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Network className="h-3 w-3 mr-1" />
                                  Graph
                                </Button>
                              </div>
                            )}

                            {/* Themes */}
                            <div className="mt-2 flex flex-wrap gap-1">
                              {verse.themes.map((theme) => (
                                <Badge key={theme} variant="secondary" className="text-xs">
                                  {theme}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar - Verse Details */}
            <div className="space-y-6">
              {selectedVerse && !batchQuoteMode ? (
                <>
                  {/* Verse Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <BookOpen className="h-5 w-5 mr-2" />
                        {sampleChapter.book} {sampleChapter.chapter}:{selectedVerse}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Cross References */}
                        {currentVerse?.crossReferences && (
                          <div>
                            <h4 className="font-semibold text-sm mb-2 flex items-center">
                              <Network className="h-4 w-4 mr-1" />
                              Cross References
                            </h4>
                            <div className="space-y-2">
                              {currentVerse.crossReferences.map((ref, index) => (
                                <div key={index} className="flex items-center justify-between text-xs">
                                  <Button variant="ghost" size="sm" className="h-6 justify-start p-1">
                                    {ref.reference}
                                  </Button>
                                  <div className="flex items-center space-x-1">
                                    <Badge variant="outline" className="text-xs">
                                      {ref.relationship}
                                    </Badge>
                                    <div className="w-12 bg-muted rounded-full h-1">
                                      <div
                                        className="bg-primary h-1 rounded-full"
                                        style={{ width: `${ref.strength * 100}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Strong's Numbers */}
                        {currentVerse?.strongsNumbers && (
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Strong's Concordance</h4>
                            <div className="space-y-2">
                              {currentVerse.strongsNumbers.slice(0, 3).map((strong) => (
                                <div key={strong} className="text-xs bg-muted p-2 rounded">
                                  <div className="font-mono text-primary">{strong}</div>
                                  <div className="font-semibold">
                                    {strongsConcordance[strong as keyof typeof strongsConcordance]?.word}
                                  </div>
                                  <div className="text-muted-foreground">
                                    {strongsConcordance[strong as keyof typeof strongsConcordance]?.meaning}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Artwork */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center">
                          <Palette className="h-5 w-5 mr-2" />
                          Artwork
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Select value={artworkFilter} onValueChange={setArtworkFilter}>
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All</SelectItem>
                              <SelectItem value="painting">Paintings</SelectItem>
                              <SelectItem value="music">Music</SelectItem>
                              <SelectItem value="literature">Literature</SelectItem>
                              <SelectItem value="sculpture">Sculptures</SelectItem>
                              <SelectItem value="film">Films</SelectItem>
                              <SelectItem value="architecture">Architecture</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select value={artworkSort} onValueChange={setArtworkSort}>
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="popularity">Popular</SelectItem>
                              <SelectItem value="year">Year</SelectItem>
                              <SelectItem value="title">Title</SelectItem>
                              <SelectItem value="artist">Artist</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setArtworkView(artworkView === "grid" ? "list" : "grid")}
                          >
                            {artworkView === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-80">
                        <div className={artworkView === "grid" ? "grid grid-cols-1 gap-3" : "space-y-3"}>
                          {filteredArtwork.map((art, index) => (
                            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                              <CardContent className="p-3">
                                {artworkView === "grid" ? (
                                  <div>
                                    <img
                                      src={art.url || "/placeholder.svg"}
                                      alt={art.title}
                                      className="w-full h-32 object-cover rounded mb-2"
                                    />
                                    <h5 className="font-semibold text-xs truncate">{art.title}</h5>
                                    <p className="text-xs text-muted-foreground">{art.artist}</p>
                                    <div className="flex items-center justify-between mt-1">
                                      <Badge variant="outline" className="text-xs">
                                        {art.type}
                                      </Badge>
                                      <div className="flex items-center space-x-1">
                                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                        <span className="text-xs">{art.popularity}</span>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex space-x-3">
                                    <img
                                      src={art.url || "/placeholder.svg"}
                                      alt={art.title}
                                      className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <h5 className="font-semibold text-sm truncate">{art.title}</h5>
                                      <p className="text-xs text-muted-foreground">{art.artist}</p>
                                      <p className="text-xs text-muted-foreground">{art.year}</p>
                                      <div className="flex items-center space-x-2 mt-1">
                                        <Badge variant="outline" className="text-xs">
                                          {art.type}
                                        </Badge>
                                        <Badge variant="secondary" className="text-xs">
                                          {art.period}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  {/* Commentaries */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center">
                          <FileText className="h-5 w-5 mr-2" />
                          Commentaries
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Select value={commentaryFilter} onValueChange={setCommentaryFilter}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All</SelectItem>
                              <SelectItem value="theological">Theological</SelectItem>
                              <SelectItem value="philosophical">Philosophical</SelectItem>
                              <SelectItem value="historical">Historical</SelectItem>
                              <SelectItem value="literary">Literary</SelectItem>
                              <SelectItem value="translational">Translational</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select value={commentarySort} onValueChange={setCommentarySort}>
                            <SelectTrigger className="w-20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="rating">Rating</SelectItem>
                              <SelectItem value="likes">Likes</SelectItem>
                              <SelectItem value="year">Year</SelectItem>
                              <SelectItem value="author">Author</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-96">
                        <div className="space-y-4">
                          {filteredCommentaries.map((commentary, index) => (
                            <div key={index} className="border-l-4 border-primary/30 pl-3">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-semibold text-sm">{commentary.author}</h5>
                                <div className="flex items-center space-x-1">
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                    <span className="text-xs">{commentary.rating}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Heart className="h-3 w-3 text-red-500" />
                                    <span className="text-xs">{commentary.likes}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {commentary.discipline}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {commentary.period}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {commentary.tradition}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed">{commentary.text}</p>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  {/* Comments */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        Discussion ({filteredComments.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Textarea
                            placeholder="Share your insights..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="text-sm"
                            rows={3}
                          />
                          <Button onClick={handleAddComment} size="sm" className="w-full">
                            Add Comment
                          </Button>
                        </div>

                        <Separator />

                        <ScrollArea className="h-64">
                          <div className="space-y-4">
                            {filteredComments.map((comment) => (
                              <div key={comment.id} className="space-y-2">
                                <div className="flex items-start space-x-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                                    <AvatarFallback className="text-xs">{comment.user[0]}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="font-semibold text-xs">{comment.user}</span>
                                      {comment.verified && (
                                        <Badge variant="secondary" className="text-xs">
                                          Verified
                                        </Badge>
                                      )}
                                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                                    </div>
                                    <p className="text-xs leading-relaxed">{comment.text}</p>
                                    <div className="flex items-center space-x-3 mt-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 px-2 text-xs"
                                        onClick={() => handleLikeComment(comment.id)}
                                      >
                                        <Heart className="h-3 w-3 mr-1" />
                                        {comment.likes}
                                      </Button>
                                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                        <Reply className="h-3 w-3 mr-1" />
                                        Reply ({comment.replies.length})
                                      </Button>
                                    </div>
                                    {/* Replies */}
                                    {comment.replies.length > 0 && (
                                      <div className="mt-3 ml-4 space-y-2">
                                        {comment.replies.map((reply) => (
                                          <div key={reply.id} className="flex items-start space-x-2">
                                            <Avatar className="h-6 w-6">
                                              <AvatarImage src={reply.avatar || "/placeholder.svg"} />
                                              <AvatarFallback className="text-xs">{reply.user[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                              <div className="flex items-center space-x-2 mb-1">
                                                <span className="font-semibold text-xs">{reply.user}</span>
                                                <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                                              </div>
                                              <p className="text-xs leading-relaxed">{reply.text}</p>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-5 px-1 text-xs mt-1"
                                                onClick={() => handleLikeComment(reply.id)}
                                              >
                                                <Heart className="h-2 w-2 mr-1" />
                                                {reply.likes}
                                              </Button>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : batchQuoteMode ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Quote className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-2">Batch Quote Mode</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select multiple verses to create a batch quote. Click on verses to add them to your selection.
                    </p>
                    {selectedVerses.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Selected verses: {selectedVerses.join(", ")}</p>
                        <Button onClick={generateQuote} className="w-full">
                          Create Quote ({selectedVerses.length} verses)
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-2">Select a Verse</h3>
                    <p className="text-sm text-muted-foreground">
                      Click on any verse to explore its connections, artwork, and commentaries.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Settings Dialog */}
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="appearance" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="reading">Reading</TabsTrigger>
                <TabsTrigger value="audio">Audio</TabsTrigger>
                <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
              </TabsList>

              <TabsContent value="appearance" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                    </div>
                    <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center">
                      <Type className="h-4 w-4 mr-2" />
                      Font Size
                    </Label>
                    <Slider value={fontSize} onValueChange={setFontSize} min={12} max={28} step={1} />
                    <div className="text-xs text-muted-foreground">Current: {fontSize[0]}px</div>
                  </div>

                  <div className="space-y-2">
                    <Label>Default Translation</Label>
                    <Select value={selectedTranslation} onValueChange={setSelectedTranslation}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(bibleTranslations).map(([key, translation]) => (
                          <SelectItem key={key} value={key}>
                            {translation.name} ({translation.language})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reading" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="original-text">Show Original Text</Label>
                    <Switch id="original-text" checked={showOriginalText} onCheckedChange={setShowOriginalText} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-scroll">Auto-scroll during audio</Label>
                    <Switch id="auto-scroll" checked={autoScroll} onCheckedChange={setAutoScroll} />
                  </div>

                  <div className="space-y-2">
                    <Label>Reading Plan</Label>
                    <Select defaultValue="chronological">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chronological">Chronological</SelectItem>
                        <SelectItem value="canonical">Canonical Order</SelectItem>
                        <SelectItem value="thematic">Thematic</SelectItem>
                        <SelectItem value="custom">Custom Plan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="audio" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default Narration Voice</Label>
                    <Select value={narrationVoice} onValueChange={setNarrationVoice}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male-1">Male Voice 1 (David)</SelectItem>
                        <SelectItem value="male-2">Male Voice 2 (James)</SelectItem>
                        <SelectItem value="female-1">Female Voice 1 (Sarah)</SelectItem>
                        <SelectItem value="female-2">Female Voice 2 (Mary)</SelectItem>
                        <SelectItem value="dramatic">Dramatic Reading</SelectItem>
                        <SelectItem value="meditative">Meditative Tone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Default Playback Speed</Label>
                    <Slider value={playbackSpeed} onValueChange={setPlaybackSpeed} min={0.5} max={2} step={0.1} />
                    <div className="text-xs text-muted-foreground">Current: {playbackSpeed[0]}x</div>
                  </div>

                  <div className="space-y-2">
                    <Label>Default Volume</Label>
                    <Slider value={volume} onValueChange={setVolume} min={0} max={100} step={5} />
                    <div className="text-xs text-muted-foreground">Current: {volume[0]}%</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="accessibility" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Accessibility className="h-4 w-4" />
                      <Label htmlFor="dyslexia-friendly">Dyslexia-Friendly Font</Label>
                    </div>
                    <Switch
                      id="dyslexia-friendly"
                      checked={isDyslexiaFriendly}
                      onCheckedChange={setIsDyslexiaFriendly}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="high-contrast">High Contrast Mode</Label>
                    <Switch id="high-contrast" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="screen-reader">Screen Reader Optimized</Label>
                    <Switch id="screen-reader" />
                  </div>

                  <div className="space-y-2">
                    <Label>Keyboard Navigation</Label>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>• Arrow keys: Navigate verses</p>
                      <p>• Space: Play/Pause audio</p>
                      <p>• Enter: Select verse</p>
                      <p>• B: Bookmark verse</p>
                      <p>• Q: Quote verse</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>

        {/* Profile Dialog */}
        <Dialog open={showProfile} onOpenChange={setShowProfile}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                User Profile
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={userProfile.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-lg">{userProfile.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{userProfile.name}</h3>
                  <p className="text-sm text-muted-foreground">{userProfile.email}</p>
                  <p className="text-xs text-muted-foreground">Joined {userProfile.joinDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-4 text-center">
                    <div className="text-2xl font-bold text-primary">{userProfile.readingStreak}</div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 text-center">
                    <div className="text-2xl font-bold text-primary">{userProfile.versesRead}</div>
                    <div className="text-xs text-muted-foreground">Verses Read</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 text-center">
                    <div className="text-2xl font-bold text-primary">{userProfile.commentsPosted}</div>
                    <div className="text-xs text-muted-foreground">Comments</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 text-center">
                    <div className="text-2xl font-bold text-primary">{userProfile.bookmarkedVerses}</div>
                    <div className="text-xs text-muted-foreground">Bookmarks</div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Study Groups</h4>
                <div className="space-y-2">
                  {userProfile.studyGroups.map((group, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{group}</span>
                      <Button variant="ghost" size="sm">
                        <Users className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  Edit Profile
                </Button>
                <Button variant="outline" className="flex-1">
                  Reading History
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Quote Dialog */}
        <Dialog open={showQuoteDialog} onOpenChange={setShowQuoteDialog}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Quote</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quote Editor */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Quote Text</Label>
                  <Textarea value={quoteText} onChange={(e) => setQuoteText(e.target.value)} rows={6} />
                </div>

                <div className="space-y-2">
                  <Label>Background Category</Label>
                  <Tabs defaultValue="nature">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="nature">Nature</TabsTrigger>
                      <TabsTrigger value="religious">Religious</TabsTrigger>
                      <TabsTrigger value="modern">Modern</TabsTrigger>
                    </TabsList>
                    <TabsContent value="nature" className="mt-4">
                      <div className="grid grid-cols-3 gap-2">
                        {quoteBackgrounds
                          .filter((bg) => bg.category === "nature")
                          .map((bg) => (
                            <div
                              key={bg.id}
                              className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                                selectedQuoteBackground === bg.id ? "border-primary" : "border-transparent"
                              }`}
                              onClick={() => setSelectedQuoteBackground(bg.id)}
                            >
                              <img
                                src={bg.url || "/placeholder.svg"}
                                alt={bg.name}
                                className="w-full h-16 object-cover"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1">
                                {bg.name}
                              </div>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="religious" className="mt-4">
                      <div className="grid grid-cols-3 gap-2">
                        {quoteBackgrounds
                          .filter((bg) => bg.category === "religious")
                          .map((bg) => (
                            <div
                              key={bg.id}
                              className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                                selectedQuoteBackground === bg.id ? "border-primary" : "border-transparent"
                              }`}
                              onClick={() => setSelectedQuoteBackground(bg.id)}
                            >
                              <img
                                src={bg.url || "/placeholder.svg"}
                                alt={bg.name}
                                className="w-full h-16 object-cover"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1">
                                {bg.name}
                              </div>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="modern" className="mt-4">
                      <div className="grid grid-cols-3 gap-2">
                        {quoteBackgrounds
                          .filter((bg) => bg.category === "modern")
                          .map((bg) => (
                            <div
                              key={bg.id}
                              className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                                selectedQuoteBackground === bg.id ? "border-primary" : "border-transparent"
                              }`}
                              onClick={() => setSelectedQuoteBackground(bg.id)}
                            >
                              <img
                                src={bg.url || "/placeholder.svg"}
                                alt={bg.name}
                                className="w-full h-16 object-cover"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1">
                                {bg.name}
                              </div>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="space-y-2">
                  <Label>Font Style</Label>
                  <Select defaultValue="serif">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="serif">Serif</SelectItem>
                      <SelectItem value="sans">Sans Serif</SelectItem>
                      <SelectItem value="script">Script</SelectItem>
                      <SelectItem value="decorative">Decorative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Text Color</Label>
                  <div className="flex space-x-2">
                    {["white", "black", "gold", "blue", "red"].map((color) => (
                      <div
                        key={color}
                        className={`w-8 h-8 rounded cursor-pointer border-2 border-gray-300 ${
                          color === "white"
                            ? "bg-white"
                            : color === "black"
                              ? "bg-black"
                              : color === "gold"
                                ? "bg-yellow-500"
                                : color === "blue"
                                  ? "bg-blue-500"
                                  : "bg-red-500"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote Preview */}
              <div className="space-y-4">
                <Label>Preview</Label>
                <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden">
                  <img
                    src={quoteBackgrounds.find((bg) => bg.id === selectedQuoteBackground)?.url || "/placeholder.svg"}
                    alt="Background"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-8">
                    <div className="text-center text-white">
                      <p className="text-lg font-serif leading-relaxed mb-4">{quoteText}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Expanded Verse View Dialog */}
        <Dialog open={showExpandedView} onOpenChange={setShowExpandedView}>
          <DialogContent className="sm:max-w-6xl max-h-[95vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {sampleChapter.book} {sampleChapter.chapter}:{selectedVerse} - Expanded View
              </DialogTitle>
            </DialogHeader>
            {currentVerse && (
              <div className="space-y-6">
                {/* Verse Text */}
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-xl leading-relaxed mb-4">{currentText}</p>
                    {showOriginalText && (
                      <p className="text-lg text-muted-foreground italic border-t pt-4" dir="rtl">
                        {getOriginalText()}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Tabs for different content */}
                <Tabs defaultValue="artwork" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="artwork">Artwork</TabsTrigger>
                    <TabsTrigger value="commentaries">Commentaries</TabsTrigger>
                    <TabsTrigger value="connections">Connections</TabsTrigger>
                    <TabsTrigger value="linguistics">Linguistics</TabsTrigger>
                    <TabsTrigger value="discussion">Discussion</TabsTrigger>
                  </TabsList>

                  <TabsContent value="artwork" className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Associated Artwork</h3>
                      <div className="flex items-center space-x-2">
                        <Select value={artworkFilter} onValueChange={setArtworkFilter}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="painting">Paintings</SelectItem>
                            <SelectItem value="music">Music</SelectItem>
                            <SelectItem value="literature">Literature</SelectItem>
                            <SelectItem value="sculpture">Sculptures</SelectItem>
                            <SelectItem value="film">Films</SelectItem>
                            <SelectItem value="architecture">Architecture</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={artworkSort} onValueChange={setArtworkSort}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="popularity">Popularity</SelectItem>
                            <SelectItem value="year">Year</SelectItem>
                            <SelectItem value="title">Title</SelectItem>
                            <SelectItem value="artist">Artist</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredArtwork.map((art, index) => (
                        <Card key={index} className="overflow-hidden">
                          <div className="relative">
                            <img
                              src={art.url || "/placeholder.svg"}
                              alt={art.title}
                              className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-2 right-2">
                              <Badge variant="secondary">{art.type}</Badge>
                            </div>
                            <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-white text-sm font-medium">{art.popularity}</span>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h4 className="font-semibold text-lg mb-1">{art.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {art.artist} ({art.year})
                            </p>
                            <p className="text-sm mb-3">{art.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-1">
                                <Badge variant="outline" className="text-xs">
                                  {art.period}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {art.culture}
                                </Badge>
                              </div>
                              <div className="flex space-x-1">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Heart className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Share className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="commentaries" className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Expert Commentaries</h3>
                      <div className="flex items-center space-x-2">
                        <Select value={commentaryFilter} onValueChange={setCommentaryFilter}>
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Disciplines</SelectItem>
                            <SelectItem value="theological">Theological</SelectItem>
                            <SelectItem value="philosophical">Philosophical</SelectItem>
                            <SelectItem value="historical">Historical</SelectItem>
                            <SelectItem value="literary">Literary</SelectItem>
                            <SelectItem value="translational">Translational</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={commentarySort} onValueChange={setCommentarySort}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rating">Rating</SelectItem>
                            <SelectItem value="likes">Likes</SelectItem>
                            <SelectItem value="year">Year</SelectItem>
                            <SelectItem value="author">Author</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {filteredCommentaries.map((commentary, index) => (
                        <Card key={index}>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="font-semibold text-lg">{commentary.author}</h4>
                                <p className="text-sm text-muted-foreground">{commentary.period}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                  <span className="text-sm font-medium">{commentary.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Heart className="h-4 w-4 text-red-500" />
                                  <span className="text-sm">{commentary.likes}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 mb-3">
                              <Badge variant="outline">{commentary.discipline}</Badge>
                              <Badge variant="secondary">{commentary.tradition}</Badge>
                              <Badge variant="outline">{commentary.year}</Badge>
                            </div>
                            <p className="text-sm leading-relaxed">{commentary.text}</p>
                            <div className="flex items-center justify-between mt-4">
                              <Button variant="ghost" size="sm">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                Helpful
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share className="h-4 w-4 mr-1" />
                                Share
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="connections" className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4">Verse Connections & Cross-References</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentVerse?.crossReferences?.map((ref, index) => (
                        <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{ref.reference}</h4>
                              <Badge variant="outline">{ref.relationship}</Badge>
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm text-muted-foreground">Connection Strength:</span>
                              <div className="flex-1 bg-muted rounded-full h-2">
                                <div
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${ref.strength * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{Math.round(ref.strength * 100)}%</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Click to explore this connected verse and its relationships.
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="linguistics" className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4">Linguistic Analysis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {currentVerse?.strongsNumbers?.map((strong) => (
                        <Card key={strong}>
                          <CardContent className="p-4">
                            <div className="font-mono text-primary text-xl mb-2">{strong}</div>
                            <div className="font-semibold text-lg mb-1">
                              {strongsConcordance[strong as keyof typeof strongsConcordance]?.word}
                            </div>
                            <div className="text-sm text-muted-foreground mb-2">
                              {strongsConcordance[strong as keyof typeof strongsConcordance]?.transliteration}
                            </div>
                            <div className="text-sm mb-2">
                              {strongsConcordance[strong as keyof typeof strongsConcordance]?.meaning}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {strongsConcordance[strong as keyof typeof strongsConcordance]?.definition}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="discussion" className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4">Community Discussion</h3>
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="p-4">
                          <Textarea
                            placeholder="Share your insights about this verse..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            rows={4}
                          />
                          <Button onClick={handleAddComment} className="mt-2">
                            Post Comment
                          </Button>
                        </CardContent>
                      </Card>

                      <div className="space-y-4">
                        {filteredComments.map((comment) => (
                          <Card key={comment.id}>
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{comment.user[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <span className="font-semibold">{comment.user}</span>
                                    {comment.verified && (
                                      <Badge variant="secondary" className="text-xs">
                                        Verified
                                      </Badge>
                                    )}
                                    <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                                  </div>
                                  <p className="text-sm leading-relaxed mb-3">{comment.text}</p>
                                  <div className="flex items-center space-x-4">
                                    <Button variant="ghost" size="sm" onClick={() => handleLikeComment(comment.id)}>
                                      <Heart className="h-4 w-4 mr-1" />
                                      {comment.likes}
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Reply className="h-4 w-4 mr-1" />
                                      Reply
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Share className="h-4 w-4 mr-1" />
                                      Share
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Graph View Dialog */}
        <Dialog open={showGraphView} onOpenChange={setShowGraphView}>
          <DialogContent className="sm:max-w-6xl max-h-[95vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Network className="h-5 w-5 mr-2" />
                Verse Connection Graph
              </DialogTitle>
            </DialogHeader>
            <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Network className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Interactive Verse Graph</h3>
                <p className="text-sm text-muted-foreground">
                  Explore connections between verses through an interactive network visualization.
                </p>
                <Button className="mt-4">
                  <Eye className="h-4 w-4 mr-2" />
                  View Full Graph
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Audio element for narration */}
        <audio ref={audioRef} className="hidden" />
      </div>
    </div>
  )
}
