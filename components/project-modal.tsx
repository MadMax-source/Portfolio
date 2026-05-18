'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, Clock, User, CheckCircle2, AlertTriangle, MessageSquarePlus, Upload, Star } from 'lucide-react'
import { Project } from '@/types/project'
import { Button } from '@/components/ui/button'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

const categoryGradients: Record<string, string> = {
  blockchain: 'from-purple-500 to-blue-500',
  devops: 'from-orange-500 to-red-500',
  'ethical-hacking': 'from-green-500 to-emerald-500',
  ai: 'from-cyan-500 to-blue-500',
  web2: 'from-pink-500 to-rose-500',
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [reviewData, setReviewData] = useState({
    name: '',
    position: '',
    review: '',
    rating: 5,
  })
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showReviewForm) {
          setShowReviewForm(false)
        } else {
          onClose()
        }
      }
    }
    
    if (project) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEscape)
    }
    
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleEscape)
    }
  }, [project, onClose, showReviewForm])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    setReviewSubmitted(true)
    setTimeout(() => {
      setShowReviewForm(false)
      setReviewSubmitted(false)
      setReviewData({ name: '', position: '', review: '', rating: 5 })
      setPreviewImage(null)
    }, 2000)
  }

  const closeReviewForm = () => {
    setShowReviewForm(false)
    setReviewSubmitted(false)
    setReviewData({ name: '', position: '', review: '', rating: 5 })
    setPreviewImage(null)
  }

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-border shadow-2xl"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Header with gradient */}
            <div className={`relative h-48 md:h-64 bg-gradient-to-br ${categoryGradients[project.category]} overflow-hidden`}>
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="text-8xl opacity-50"
                >
                  {project.category === 'blockchain' && '⛓️'}
                  {project.category === 'devops' && '⚙️'}
                  {project.category === 'ethical-hacking' && '🔐'}
                  {project.category === 'ai' && '🤖'}
                  {project.category === 'web2' && '🌐'}
                </motion.span>
              </div>
              
              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-card to-transparent">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl md:text-4xl font-bold text-white"
                >
                  {project.title}
                </motion.h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-8">
              {/* Meta Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{project.role}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{project.duration}</span>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold mb-3">About This Project</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.longDescription}
                </p>
              </motion.div>

              {/* Technologies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="px-3 py-1.5 text-sm rounded-lg bg-primary/10 border border-primary/20 text-primary"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Challenges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-4 rounded-xl bg-muted/50 border border-border"
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-lg font-semibold">Challenges & Solutions</h3>
                </div>
                <p className="text-muted-foreground">
                  {project.challenges}
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                {project.liveUrl && (
                  <Button asChild className="gap-2">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      View Live Demo
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="outline" asChild className="gap-2">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                      View Source Code
                    </a>
                  </Button>
                )}
              </motion.div>

              {/* Add Review Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-6 border-t border-border"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Project Reviews</h3>
                    <p className="text-sm text-muted-foreground">Share your experience with this project</p>
                  </div>
                  <Button
                    onClick={() => setShowReviewForm(true)}
                    variant="outline"
                    className="gap-2 border-primary/30 hover:border-primary hover:bg-primary/10"
                  >
                    <MessageSquarePlus className="w-4 h-4" />
                    Add Review
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Review Form Modal */}
          <AnimatePresence>
            {showReviewForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center p-4"
                onClick={closeReviewForm}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 30 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-lg rounded-2xl bg-card border border-border shadow-2xl overflow-hidden"
                >
                  {/* Form Header */}
                  <div className="relative p-6 bg-gradient-to-br from-primary/20 to-primary/5 border-b border-border">
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={closeReviewForm}
                      className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                    <h3 className="text-xl font-bold">Add Your Review</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Share your feedback for {project.title}
                    </p>
                  </div>

                  {/* Form Content */}
                  <AnimatePresence mode="wait">
                    {reviewSubmitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="p-8 flex flex-col items-center justify-center text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', delay: 0.1 }}
                          className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4"
                        >
                          <CheckCircle2 className="w-8 h-8 text-green-500" />
                        </motion.div>
                        <h4 className="text-lg font-semibold">Review Submitted!</h4>
                        <p className="text-sm text-muted-foreground mt-2">
                          Thank you for your feedback.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmitReview}
                        className="p-6 space-y-5"
                      >
                        {/* Profile Picture Upload */}
                        <div className="flex items-center gap-4">
                          <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="relative w-16 h-16 rounded-full bg-muted border-2 border-dashed border-border hover:border-primary/50 cursor-pointer transition-colors flex items-center justify-center overflow-hidden group"
                          >
                            {previewImage ? (
                              <img 
                                src={previewImage} 
                                alt="Profile preview" 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Upload className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            )}
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Profile Picture</p>
                            <p className="text-xs text-muted-foreground">Click to upload (optional)</p>
                          </div>
                        </div>

                        {/* Name Input */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Your Name *</label>
                          <input
                            type="text"
                            required
                            value={reviewData.name}
                            onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                        </div>

                        {/* Position Input */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Position / Role *</label>
                          <input
                            type="text"
                            required
                            value={reviewData.position}
                            onChange={(e) => setReviewData({ ...reviewData, position: e.target.value })}
                            placeholder="CEO at Company"
                            className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                        </div>

                        {/* Rating */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Rating</label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <motion.button
                                key={star}
                                type="button"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setReviewData({ ...reviewData, rating: star })}
                                className="p-1"
                              >
                                <Star
                                  className={`w-6 h-6 transition-colors ${
                                    star <= reviewData.rating
                                      ? 'fill-yellow-500 text-yellow-500'
                                      : 'text-muted-foreground'
                                  }`}
                                />
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        {/* Review Text */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Your Review *</label>
                          <textarea
                            required
                            rows={4}
                            value={reviewData.review}
                            onChange={(e) => setReviewData({ ...reviewData, review: e.target.value })}
                            placeholder="Share your experience working on this project..."
                            className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                          />
                        </div>

                        {/* Submit Button */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button type="submit" className="w-full gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Submit Review
                          </Button>
                        </motion.div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
