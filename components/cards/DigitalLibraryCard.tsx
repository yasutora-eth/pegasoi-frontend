'use client'

import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Calendar, 
  MapPin, 
  Shield,
  QrCode,
  ExternalLink 
} from 'lucide-react'

export interface LibraryCard {
  id: string
  type: 'university' | 'public' | 'special' | 'digital'
  name: string
  institution: string
  memberSince: string
  expiryDate: string
  accessLevel: 'basic' | 'premium' | 'researcher' | 'faculty'
  cardNumber: string
  location?: string
  benefits: string[]
  isActive: boolean
  qrCode?: string
}

interface DigitalLibraryCardProps {
  card: LibraryCard
  variant?: 'default' | 'cyber'
  showQR?: boolean
  onUse?: (card: LibraryCard) => void
}

export function DigitalLibraryCard({
  card,
  variant = 'default',
  showQR = false,
  onUse
}: DigitalLibraryCardProps) {
  const getCardColor = (type: string) => {
    switch (type) {
      case 'university':
        return 'from-blue-600 to-blue-800'
      case 'public':
        return 'from-green-600 to-green-800'
      case 'special':
        return 'from-purple-600 to-purple-800'
      case 'digital':
        return 'from-cyan-600 to-cyan-800'
      default:
        return 'from-gray-600 to-gray-800'
    }
  }

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'faculty':
        return 'bg-gold-500 text-black'
      case 'researcher':
        return 'bg-silver-500 text-black'
      case 'premium':
        return 'bg-purple-500 text-white'
      default:
        return 'bg-blue-500 text-white'
    }
  }

  const isExpired = new Date(card.expiryDate) < new Date()

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
      variant === 'cyber' ? 'cyber-card' : ''
    } ${!card.isActive || isExpired ? 'opacity-60' : ''}`}>
      {/* Card Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getCardColor(card.type)} opacity-90`} />
      
      {/* Card Content */}
      <div className="relative z-10 text-white">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wide">
                {card.type} Library
              </span>
            </div>
            <Badge className={getAccessLevelColor(card.accessLevel)}>
              {card.accessLevel.toUpperCase()}
            </Badge>
          </div>
          
          <div className="mt-2">
            <h3 className="text-xl font-bold">{card.name}</h3>
            <p className="text-sm opacity-90">{card.institution}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Card Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="opacity-70">Card Number</p>
              <p className="font-mono font-medium">{card.cardNumber}</p>
            </div>
            <div>
              <p className="opacity-70">Member Since</p>
              <p className="font-medium">{new Date(card.memberSince).getFullYear()}</p>
            </div>
          </div>

          {/* Location */}
          {card.location && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4" />
              <span>{card.location}</span>
            </div>
          )}

          {/* Expiry Status */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Expires: {new Date(card.expiryDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className={`h-4 w-4 ${card.isActive && !isExpired ? 'text-green-400' : 'text-red-400'}`} />
              <span className={card.isActive && !isExpired ? 'text-green-400' : 'text-red-400'}>
                {card.isActive && !isExpired ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          {/* Benefits Preview */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Access Benefits:</p>
            <div className="flex flex-wrap gap-1">
              {card.benefits.slice(0, 3).map((benefit, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-white/20 text-white">
                  {benefit}
                </Badge>
              ))}
              {card.benefits.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-white/20 text-white">
                  +{card.benefits.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onUse?.(card)}
              disabled={!card.isActive || isExpired}
              className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Use Card
            </Button>
            {showQR && (
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <QrCode className="h-3 w-3" />
              </Button>
            )}
          </div>
        </CardContent>
      </div>

      {/* Status Indicator */}
      {!card.isActive && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          INACTIVE
        </div>
      )}
      {isExpired && (
        <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
          EXPIRED
        </div>
      )}
    </Card>
  )
}
