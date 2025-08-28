'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Wallet, 
  Plus, 
  Filter,
  Grid3X3,
  List
} from 'lucide-react'
import { DigitalLibraryCard, type LibraryCard } from './DigitalLibraryCard'
import { JournalClubCard, type JournalClubCard as JournalClubCardType } from './JournalClubCard'

interface CardWalletProps {
  libraryCards: LibraryCard[]
  journalClubCards: JournalClubCardType[]
  onAddCard?: () => void
  onUseCard?: (card: LibraryCard | JournalClubCardType) => void
}

export function CardWallet({
  libraryCards,
  journalClubCards,
  onAddCard,
  onUseCard
}: CardWalletProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filter, setFilter] = useState<'all' | 'active' | 'expired'>('all')

  const activeLibraryCards = libraryCards.filter(card => 
    filter === 'all' || 
    (filter === 'active' && card.isActive && new Date(card.expiryDate) > new Date()) ||
    (filter === 'expired' && (!card.isActive || new Date(card.expiryDate) <= new Date()))
  )

  const activeJournalCards = journalClubCards.filter(card =>
    filter === 'all' ||
    (filter === 'active' && card.isActive) ||
    (filter === 'expired' && !card.isActive)
  )

  const totalCards = libraryCards.length + journalClubCards.length
  const activeCards = libraryCards.filter(c => c.isActive && new Date(c.expiryDate) > new Date()).length + 
                     journalClubCards.filter(c => c.isActive).length

  return (
    <div className="space-y-6">
      {/* Wallet Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wallet className="h-6 w-6" />
              <div>
                <CardTitle>Digital Card Wallet</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {activeCards} active cards • {totalCards} total
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
              </Button>
              <Button onClick={onAddCard} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Card
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Filter Controls */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">Filter:</span>
        </div>
        <div className="flex gap-1">
          {(['all', 'active', 'expired'] as const).map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(filterType)}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Card Tabs */}
      <Tabs defaultValue="library" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="library" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Library Cards ({activeLibraryCards.length})
          </TabsTrigger>
          <TabsTrigger value="clubs" className="flex items-center gap-2">
            <Badge className="h-4 w-4" />
            Journal Clubs ({activeJournalCards.length})
          </TabsTrigger>
        </TabsList>

        {/* Library Cards */}
        <TabsContent value="library" className="space-y-4">
          {activeLibraryCards.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Wallet className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Library Cards</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Add your first library card to start accessing digital resources
                </p>
                <Button onClick={onAddCard}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Library Card
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className={`grid gap-4 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {activeLibraryCards.map((card) => (
                <DigitalLibraryCard
                  key={card.id}
                  card={card}
                  onUse={onUseCard}
                  showQR={true}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Journal Club Cards */}
        <TabsContent value="clubs" className="space-y-4">
          {activeJournalCards.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Badge className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Journal Club Memberships</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Join journal clubs to discuss research with peers
                </p>
                <Button onClick={onAddCard}>
                  <Plus className="h-4 w-4 mr-1" />
                  Join Club
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className={`grid gap-4 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {activeJournalCards.map((card) => (
                <JournalClubCard
                  key={card.id}
                  card={card}
                  onJoin={onUseCard}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
