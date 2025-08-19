"use client"

import Link from "next/link"
import { Github, Twitter, Mail, Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="cyber-card border-t border-cyan-500/30 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-cyan-400" />
              <h3 className="text-lg font-bold text-cyber text-glow">Research Portal</h3>
            </div>
            <p className="text-sm text-cyan-400">
              Advanced classical studies research platform with AI-powered assistance.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-cyan-300">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/articles" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/research-gallery" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Research Gallery
                </Link>
              </li>
              <li>
                <Link href="/api-testing" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  API Testing
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-cyan-300">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/information" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Information
                </Link>
              </li>
              <li>
                <Link href="/system-check" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  System Status
                </Link>
              </li>
              <li>
                <Link href="/archive" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Archive
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-cyan-300">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-cyan-500/30 mt-8 pt-8 text-center">
          <p className="text-sm text-cyan-400">
            © 2024 Research Portal. All rights reserved. | Powered by advanced AI systems.
          </p>
        </div>
      </div>
    </footer>
  )
}
