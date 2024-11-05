import { Button } from '@/components/ui/button';
import React from 'react';

interface TechStackItem {
  name: string;
  description: string;
}

interface ProfitabilityItem {
  amount: string;
  reason: string;
}

interface PricingPlan {
  amount: string;
  description: string;
}

interface UserFlowStep {
  step: string;
  description: string;
}

interface GPTResponse {
  title: string;
  description: string;
  tech_stack: TechStackItem[];
  pros: string[];
  cons: string[];
  monetization: string[];
  marketing: string[];
  user_flow: UserFlowStep[];
  profitablity: ProfitabilityItem[];
  pricing_plans: PricingPlan[];
}

interface ExportToTxtButtonProps {
  gptResponse: GPTResponse;
}

const ExportToTxtButton: React.FC<ExportToTxtButtonProps> = ({ gptResponse }) => {
  // Function to convert JSON data to a readable text format
  const convertToText = (data: GPTResponse): string => {
    let textContent = '';

    textContent += `Project Title: ${data.title}\n\n`;
    textContent += `Description:\n${data.description}\n\n`;

    textContent += `Tech Stack:\n`;
    data.tech_stack.forEach((tech) => {
      textContent += `  - ${tech.name}: ${tech.description}\n`;
    });
    textContent += `\n`;

    textContent += `Pros:\n`;
    data.pros.forEach((pro) => {
      textContent += `  - ${pro}\n`;
    });
    textContent += `\n`;

    textContent += `Cons:\n`;
    data.cons.forEach((con) => {
      textContent += `  - ${con}\n`;
    });
    textContent += `\n`;

    textContent += `Monetization Strategies:\n`;
    data.monetization.forEach((strategy) => {
      textContent += `  - ${strategy}\n`;
    });
    textContent += `\n`;

    textContent += `Marketing Strategies:\n`;
    data.marketing.forEach((strategy) => {
      textContent += `  - ${strategy}\n`;
    });
    textContent += `\n`;

    textContent += `User Flow:\n`;
    data.user_flow.forEach((step, index) => {
      textContent += `  ${index + 1}. ${step.step}: ${step.description}\n`;
    });
    textContent += `\n`;

    textContent += `Profitability:\n`;
    data.profitablity.forEach((profit) => {
      textContent += `  - Amount: ${profit.amount}\n    Reason: ${profit.reason}\n`;
    });
    textContent += `\n`;

    textContent += `Pricing Plans:\n`;
    data.pricing_plans.forEach((plan) => {
      textContent += `  - ${plan.amount}: ${plan.description}\n`;
    });

    return textContent;
  };

  // Function to handle download as .txt file
  const handleDownload = (): void => {
    const textData = convertToText(gptResponse);
    const blob = new Blob([textData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'project_details.txt';
    link.click();

    URL.revokeObjectURL(url); // Free up memory
  };

  return (
    <Button onClick={handleDownload} variant={"outline"} className='col-span-1 md:col-span-2'>
      Download as Text File
    </Button>
  );
};

export default ExportToTxtButton;
