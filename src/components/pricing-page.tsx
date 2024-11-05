'use client'

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Link from "next/link"

export function PricingPageComponent() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly" | "yearly">("monthly")

  const plans = [
    {
      name: "Free",
      description: "For individuals just getting started",
      price: {
        monthly: "$0",
        quarterly: "$0",
        yearly: "$0",
      },
      features: [
        "Basic marketing strategies",
        "Limited market insights",
        "Basic pros and cons analysis",
        "Basic monetization information",
        "Single project idea",
      ],
    },
    {
      name: "Pro",
      description: "For professionals and small teams",
      price: {
        monthly: "$29",
        quarterly: "$79",
        yearly: "$290",
      },
      features: [
        "Advanced marketing strategies",
        "Comprehensive market insights",
        "Detailed pros and cons analysis",
        "In-depth monetization information",
        "Multiple project ideas",
        "Cons mitigation strategies",
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Choose Your Plan</h1>
      <div className="flex justify-center mb-8">
      <RadioGroup defaultValue="monthly" className="flex space-x-4" onValueChange={(value: string) => setBillingCycle(value as "monthly" | "quarterly" | "yearly")}>
        <div className="flex items-center space-x-2">
        <RadioGroupItem value="monthly" id="monthly" />
        <Label htmlFor="monthly">Monthly</Label>
        </div>
        <div className="flex items-center space-x-2">
        <RadioGroupItem value="quarterly" id="quarterly" />
        <Label htmlFor="quarterly">Quarterly</Label>
        </div>
        <div className="flex items-center space-x-2">
        <RadioGroupItem value="yearly" id="yearly" />
        <Label htmlFor="yearly">Yearly</Label>
        </div>
      </RadioGroup>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {plans.map((plan) => (
        <Card key={plan.name} className="flex flex-col">
        <CardHeader>
          <CardTitle>{plan.name}</CardTitle>
          <CardDescription>{plan.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="text-4xl font-bold mb-4">{plan.price[billingCycle]}</div>
          <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
            <Check className="text-green-500 mr-2 h-5 w-5" />
            {feature}
            </li>
          ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full">{plan.name === "Free" ? "Get Started" : "Upgrade to Pro"}</Button>
        </CardFooter>
        </Card>
      ))}
      </div>
      <div className="flex justify-center mt-8">
      <Link href={'/'}><Button>Go to Homepage</Button></Link>
      </div>
    </div>
  )
}