'use client'

import React from 'react'
import { ArticlesList } from '@/components/ArticlesList'
import { useArticles } from '@/lib/hooks/useArticles'
import type { Article } from '@/types/graphql'

// Mock data for development - this will be replaced by real GraphQL data
const mockArticles: Article[] = [
  {
    articleId: '1',
    title: 'Roman Architecture in the Imperial Period',
    content: 'An extensive study of architectural developments during the height of the Roman Empire, examining the evolution of construction techniques, materials, and design principles that defined imperial Roman architecture.',
    authors: ['Dr. Marcus Aurelius', 'Prof. Julia Caesar'],
    articleAbstract: 'This comprehensive study examines the architectural innovations and developments that characterized the Roman Imperial period, focusing on the evolution of construction techniques, the use of new materials such as concrete, and the development of distinctive design principles that would influence architecture for centuries to come.',
    keywords: ['Roman Architecture', 'Imperial Period', 'Construction Techniques', 'Ancient Rome', 'Architectural History'],
    publicationDate: '2024-01-15T10:00:00Z',
    status: 'published',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    journal: 'Journal of Classical Architecture',
    doi: '10.1000/182'
  },
  {
    articleId: '2',
    title: 'Greek Pottery: Styles and Techniques',
    content: 'A comprehensive analysis of ancient Greek pottery traditions, exploring the various styles, decorative techniques, and cultural significance of ceramic arts in classical antiquity.',
    authors: ['Prof. Helena Athena', 'Dr. Dionysus Ceramicus'],
    articleAbstract: 'This research provides a detailed analysis of ancient Greek pottery traditions, examining the evolution of ceramic styles from geometric patterns to red-figure techniques, and exploring the cultural and religious significance of pottery in Greek society.',
    keywords: ['Greek Pottery', 'Ceramic Arts', 'Ancient Greece', 'Red-figure', 'Black-figure', 'Classical Art'],
    publicationDate: '2024-01-20T14:30:00Z',
    status: 'published',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    journal: 'Classical Studies Quarterly',
    doi: '10.1000/183'
  },
  {
    articleId: '3',
    title: 'Egyptian Hieroglyphic Evolution',
    content: 'Tracing the development of hieroglyphic writing systems from early dynastic periods through the Ptolemaic era, examining linguistic changes and cultural influences.',
    authors: ['Dr. Anubis Thoth', 'Prof. Isis Scripta'],
    articleAbstract: 'This study traces the evolution of Egyptian hieroglyphic writing from its earliest forms in the Early Dynastic period through its final developments during the Ptolemaic era, analyzing linguistic changes, cultural influences, and the gradual transition to other writing systems.',
    keywords: ['Egyptian Hieroglyphs', 'Ancient Writing', 'Linguistics', 'Egyptology', 'Ptolemaic Period'],
    publicationDate: '2024-01-25T09:15:00Z',
    status: 'published',
    createdAt: '2024-01-25T09:15:00Z',
    updatedAt: '2024-01-25T09:15:00Z',
    journal: 'Egyptian Studies Review',
    doi: '10.1000/184'
  },
  {
    articleId: '4',
    title: 'Classical Literature Analysis: Epic Poetry and Drama',
    content: 'A detailed examination of narrative structures and literary devices employed in classical Greek and Roman literature, with focus on epic poetry and dramatic works.',
    authors: ['Prof. Sophia Minerva', 'Dr. Apollo Musicus'],
    articleAbstract: 'This comprehensive analysis examines the narrative structures, literary devices, and thematic elements that characterize classical Greek and Roman literature, with particular attention to epic poetry such as the Iliad and Odyssey, and the dramatic works of Aeschylus, Sophocles, and Euripides.',
    keywords: ['Classical Literature', 'Epic Poetry', 'Greek Drama', 'Literary Analysis', 'Homer', 'Tragedy'],
    publicationDate: '2024-02-01T16:45:00Z',
    status: 'in_review',
    createdAt: '2024-02-01T16:45:00Z',
    updatedAt: '2024-02-01T16:45:00Z',
    journal: 'Literary Classics Today',
    doi: null
  },
  {
    articleId: '5',
    title: 'Byzantine Art and Culture: Bridging Classical and Medieval',
    content: 'Exploring the artistic and cultural achievements of the Byzantine Empire, from religious iconography to architectural innovations that bridged classical and medieval periods.',
    authors: ['Dr. Constantine Justinian', 'Prof. Theodora Basilissa'],
    articleAbstract: 'This research explores the rich artistic and cultural heritage of the Byzantine Empire, examining how Byzantine artists and architects created a unique synthesis of classical Greco-Roman traditions with Christian themes and medieval innovations, particularly in religious iconography and architectural design.',
    keywords: ['Byzantine Art', 'Medieval Art', 'Religious Iconography', 'Byzantine Architecture', 'Cultural History'],
    publicationDate: '2024-02-10T11:20:00Z',
    status: 'published',
    createdAt: '2024-02-10T11:20:00Z',
    updatedAt: '2024-02-10T11:20:00Z',
    journal: 'Byzantine Studies International',
    doi: '10.1000/185'
  },
  {
    articleId: '6',
    title: 'Mesopotamian Cuneiform: The Dawn of Written Language',
    content: 'An investigation into the origins and development of cuneiform writing in ancient Mesopotamia, examining its role in administration, literature, and cultural transmission.',
    authors: ['Dr. Gilgamesh Sumerian', 'Prof. Inanna Akkadian'],
    articleAbstract: 'This study investigates the origins and evolution of cuneiform writing in ancient Mesopotamia, analyzing its development from simple pictographic records to complex literary and administrative texts, and examining its crucial role in the preservation and transmission of ancient Near Eastern culture.',
    keywords: ['Cuneiform', 'Mesopotamia', 'Ancient Writing', 'Sumerian', 'Akkadian', 'Near Eastern Studies'],
    publicationDate: '2024-02-15T13:30:00Z',
    status: 'draft',
    createdAt: '2024-02-15T13:30:00Z',
    updatedAt: '2024-02-15T13:30:00Z',
    journal: null,
    doi: null
  }
]

export default function ArticlesPage() {
  // Use GraphQL hook with fallback to mock data
  const { data, loading, error, refetch } = useArticles()
  
  // Use mock data if GraphQL fails or returns no data
  const articles = data?.articles && data.articles.length > 0 ? data.articles : mockArticles
  
  const handleViewArticle = (article: Article) => {
    // TODO: Navigate to article detail page or open modal
    // Could implement: router.push(`/articles/${article.articleId}`)
  }

  const handleRefresh = () => {
    if (refetch) {
      refetch()
    } else {
      // Fallback refresh for mock data
      window.location.reload()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ArticlesList
        articles={articles}
        loading={loading}
        error={error}
        variant="cyber"
        onRefresh={handleRefresh}
        onViewArticle={handleViewArticle}
      />
    </div>
  )
}