"use client"
import * as React from "react"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/app/ui/dialog"
import { Button } from "@/app/ui/button"
import { useRouter } from "next/navigation"

interface ModalProps {
	children: React.ReactNode
	title: string
	description: string
}

export function Modal({ children, title, description }: ModalProps) {
	const router = useRouter()

	const handleStart = () => {
		router.push('/go')
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				{children}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold flex justify-center">{title}</DialogTitle>
					<DialogDescription>
						{description}
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="space-y-2">
						<h4 className="font-medium leading-none underline">Steps:</h4>
						<ol className="list-decimal list-inside space-y-2 text-sm">
							<li>Enter the task or things you hesitate on</li>
							<li>Press "Enter", or "Add More" button if you're on mobile</li>
							<li>Press the "RUN" button</li>
							<li>Let the magic happen</li>
                            <li>DO IT </li>
						</ol>
					</div>
					<div className="flex justify-end pt-4">
						<Button 
							onClick={handleStart}
							className="bg-black/80 hover:bg-black/30 dark:bg-white dark:hover:bg-white/30 text-white dark:text-black"
						>
							RUN
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
} 