'use client'

import React from 'react'
import { CardWallet } from '@/components/cards/CardWallet'
import type { LibraryCard } from '@/components/cards/DigitalLibraryCard'
import type { JournalClubCard } from '@/components/cards/JournalClubCard'

// Sample data for demonstration
const sampleLibraryCards: LibraryCard[] = [
  {
    id: '1',
    type: 'university',
    name: 'MIT Libraries',
    institution: 'Massachusetts Institute of Technology',
    memberSince: '2023-09-01',
    expiryDate: '2025-08-31',
    accessLevel: 'researcher',
    cardNumber: 'MIT-2024-789123',
    location: 'Cambridge, MA',
    benefits: ['Digital Archives', 'IEEE Access', 'Rare Books', 'Inter-library Loans'],
    isActive: true,
    qrCode: 'sample-qr-code'
  },
  {
    id: '2',
    type: 'digital',
    name: 'ArXiv Premium',
    institution: 'Cornell University',
    memberSince: '2024-01-15',
    expiryDate: '2024-12-31',
    accessLevel: 'premium',
    cardNumber: 'ARXIV-PREM-456789',
    benefits: ['Early Access', 'Advanced Search', 'Citation Tools', 'Export Features'],
    isActive: true
  },
  {
    id: '3',
    type: 'public',
    name: 'Boston Public Library',
    institution: 'City of Boston',
    memberSince: '2022-03-10',
    expiryDate: '2024-03-10',
    accessLevel: 'basic',
    cardNumber: 'BPL-2022-123456',
    location: 'Boston, MA',
    benefits: ['Digital Collections', 'E-books', 'Research Databases'],
    isActive: false
  }
]

const sampleJournalClubs: JournalClubCard[] = [
  {
    id: '1',
    name: 'AI Research Collective',
    type: 'academic',
    organization: 'MIT CSAIL',
    memberSince: '2023-09-01',
    meetingSchedule: 'Weekly Fridays 3PM EST',
    nextMeeting: '2024-09-06',
    memberCount: 45,
    role: 'moderator',
    specializations: ['Machine Learning', 'Computer Vision', 'NLP', 'Robotics'],
    isActive: true,
    recentActivity: {
      papersDiscussed: 12,
      meetingsAttended: 8,
      contributions: 15
    }
  },
  {
    id: '2',
    name: 'Quantum Computing Society',
    type: 'professional',
    organization: 'IEEE Quantum Initiative',
    memberSince: '2024-02-01',
    meetingSchedule: 'Monthly 2nd Tuesday 7PM EST',
    nextMeeting: '2024-09-10',
    memberCount: 234,
    role: 'member',
    specializations: ['Quantum Algorithms', 'Quantum Hardware', 'Error Correction'],
    isActive: true,
    recentActivity: {
      papersDiscussed: 6,
      meetingsAttended: 3,
      contributions: 2
    }
  },
  {
    id: '3',
    name: 'Biotech Innovators',
    type: 'community',
    organization: 'Reddit r/biotech',
    memberSince: '2023-05-15',
    meetingSchedule: 'Bi-weekly Thursdays 6PM EST',
    memberCount: 1250,
    role: 'presenter',
    specializations: ['Gene Therapy', 'CRISPR', 'Synthetic Biology', 'Drug Discovery'],
    isActive: true,
    recentActivity: {
      papersDiscussed: 18,
      meetingsAttended: 12,
      contributions: 28
    }
  }
]

export default function CardsPage() {
  const handleAddCard = () => {
    // TODO: Implement add card functionality
    alert('Add card functionality coming soon!')
  }

  const handleUseCard = (card: LibraryCard | JournalClubCard) => {
    // TODO: Implement card usage functionality
    alert(`Using card: ${card.name}`)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Digital Cards</h1>
        <p className="text-muted-foreground">
          Manage your library access cards and journal club memberships
        </p>
      </div>

      <CardWallet
        libraryCards={sampleLibraryCards}
        journalClubCards={sampleJournalClubs}
        onAddCard={handleAddCard}
        onUseCard={handleUseCard}
      />
    </div>
  )
}
