'use client'

import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Calendar, 
  MessageCircle, 
  BookOpen,
  Trophy,
  Clock
} from 'lucide-react'

export interface JournalClubCard {
  id: string
  name: string
  type: 'academic' | 'professional' | 'community' | 'conference'
  organization: string
  memberSince: string
  meetingSchedule: string
  nextMeeting?: string
  memberCount: number
  role: 'member' | 'moderator' | 'admin' | 'presenter'
  specializations: string[]
  isActive: boolean
  recentActivity?: {
    papersDiscussed: number
    meetingsAttended: number
    contributions: number
  }
}

interface JournalClubCardProps {
  card: JournalClubCard
  variant?: 'default' | 'cyber'
  onJoin?: (card: JournalClubCard) => void
}

export function JournalClubCard({
  card,
  variant = 'default',
  onJoin
}: JournalClubCardProps) {
  const getClubColor = (type: string) => {
    switch (type) {
      case 'academic':
        return 'from-indigo-600 to-indigo-800'
      case 'professional':
        return 'from-emerald-600 to-emerald-800'
      case 'community':
        return 'from-orange-600 to-orange-800'
      case 'conference':
        return 'from-rose-600 to-rose-800'
      default:
        return 'from-gray-600 to-gray-800'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500 text-white'
      case 'moderator':
        return 'bg-purple-500 text-white'
      case 'presenter':
        return 'bg-yellow-500 text-black'
      default:
        return 'bg-blue-500 text-white'
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Trophy className="h-3 w-3" />
      case 'moderator':
        return <Users className="h-3 w-3" />
      case 'presenter':
        return <MessageCircle className="h-3 w-3" />
      default:
        return <BookOpen className="h-3 w-3" />
    }
  }

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
      variant === 'cyber' ? 'cyber-card' : ''
    } ${!card.isActive ? 'opacity-60' : ''}`}>
      {/* Card Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getClubColor(card.type)} opacity-90`} />
      
      {/* Card Content */}
      <div className="relative z-10 text-white">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wide">
                {card.type} Club
              </span>
            </div>
            <Badge className={getRoleColor(card.role)}>
              <span className="flex items-center gap-1">
                {getRoleIcon(card.role)}
                {card.role.toUpperCase()}
              </span>
            </Badge>
          </div>
          
          <div className="mt-2">
            <h3 className="text-xl font-bold">{card.name}</h3>
            <p className="text-sm opacity-90">{card.organization}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Club Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="opacity-70">Members</p>
              <p className="font-medium">{card.memberCount.toLocaleString()}</p>
            </div>
            <div>
              <p className="opacity-70">Member Since</p>
              <p className="font-medium">{new Date(card.memberSince).getFullYear()}</p>
            </div>
          </div>

          {/* Meeting Schedule */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{card.meetingSchedule}</span>
            </div>
            {card.nextMeeting && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Next: {new Date(card.nextMeeting).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {/* Specializations */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Focus Areas:</p>
            <div className="flex flex-wrap gap-1">
              {card.specializations.slice(0, 3).map((spec, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-white/20 text-white">
                  {spec}
                </Badge>
              ))}
              {card.specializations.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-white/20 text-white">
                  +{card.specializations.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          {card.recentActivity && (
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-2 bg-white/10 rounded">
                <p className="font-bold">{card.recentActivity.papersDiscussed}</p>
                <p className="opacity-70">Papers</p>
              </div>
              <div className="text-center p-2 bg-white/10 rounded">
                <p className="font-bold">{card.recentActivity.meetingsAttended}</p>
                <p className="opacity-70">Meetings</p>
              </div>
              <div className="text-center p-2 bg-white/10 rounded">
                <p className="font-bold">{card.recentActivity.contributions}</p>
                <p className="opacity-70">Posts</p>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onJoin?.(card)}
              disabled={!card.isActive}
              className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              {card.nextMeeting ? 'Join Next Meeting' : 'View Club'}
            </Button>
          </div>
        </CardContent>
      </div>

      {/* Status Indicator */}
      {!card.isActive && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          INACTIVE
        </div>
      )}
    </Card>
  )
}
