"use client";
import * as React from "react";


// import DropDown from "./component/DropDown";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { CornerUpRight, Info } from "lucide-react";
import { SkeletonDemo } from "../utils/Skeleton";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SheetDemo } from "./component/AsideBar";
import { Spotlight } from "@/components/ui/spotlight";
import { useUser } from "@clerk/nextjs";
import DropDown from "./component/DropDown";
import ExportToTxtButton from "@/providers/File-prov";

export default function Home() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isPrivate, setIsPrivate] = React.useState(false);
  console.log(isPrivate);
  const [gptResponse, setGptResponse] =
    React.useState<GptResponseContent | null>(null);
  const { user, isSignedIn, isLoaded } = useUser();

  React.useEffect(() => {
    if (gptResponse) {
      setTimeout(() => {
        const element = document.getElementById("gptResponseSection");
        if (element) {
          let start: number | null = null;
          const duration = 1000; // Duration of the scroll animation in milliseconds

          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const easeInOutQuad = (t: number) =>
              t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            const scrollY =
              window.scrollY +
              (element.getBoundingClientRect().top - window.scrollY) *
                easeInOutQuad(progress / duration);
            window.scrollTo(0, scrollY);
            if (progress < duration) {
              window.requestAnimationFrame(step);
            }
          };

          window.requestAnimationFrame(step);
        }
      }, 100); // Adjust the timeout duration as needed
    }
  }, [gptResponse]);
  const router = useRouter();

  const gpt = {
    title: ["StepTracker", "StrideSync"],
    description:
      "StepTracker is a walking step counting platform that tracks and records the number of steps taken by users daily. It motivates users to stay active and maintain a healthy lifestyle by setting step goals and providing insights into their walking habits.",
    tech_stack: [
      {
        name: "React Native",
        description:
          "React Native allows for cross-platform development, enabling the app to run on both iOS and Android devices, reaching a larger user base.",
      },
      {
        name: "Node.js",
        description:
          "Node.js is scalable and efficient for handling real-time data processing and serving the API endpoints for the mobile app.",
      },
      {
        name: "MongoDB",
        description:
          "MongoDB is a flexible NoSQL database that can store and handle large amounts of data generated by user activity on the app.",
      },
    ],
    pros: [
      "Cross-platform compatibility with React Native for wider user reach",
      "Scalability and real-time data processing with Node.js",
      "Flexibility and scalability for handling large amounts of user data with MongoDB",
    ],
    cons: [
      "Learning curve for developers unfamiliar with React Native or Node.js",
      "Potential performance issues with MongoDB when handling very large datasets",
    ],
    monetization: [
      "Subscription model with premium features like detailed activity insights and personalized goal setting",
      "In-app advertisements from fitness-related products or services",
    ],
    marketing: [
      "Partnering with fitness influencers or health bloggers to promote the app on social media platforms",
      "Offering referral programs to incentivize users to invite friends and family to join the platform",
    ],
    user_flow: [
      {
        step: "Sign Up",
        description:
          "Users create an account, providing information about their startup to customize the platform’s experience for early-stage projects.",
      },
      {
        step: "Project Creation",
        description:
          "After signing up, users are directed to create a project, where they can define the SaaS idea and choose a wireframe layout or a blank template to start with.",
      },
      {
        step: "Wireframe Design",
        description:
          "The main workspace allows users to drag-and-drop UI components, customize layouts, and set up workflows, creating a wireframe from scratch or modifying templates.",
      },
      {
        step: "Real-time Collaboration",
        description:
          "Users can invite team members to collaborate in real-time, with changes reflected instantly. Members can add comments, leave feedback, and suggest changes directly on the wireframe.",
      },
      {
        step: "Feedback and Iteration",
        description:
          "After creating the wireframe, users can open the project for feedback, which can be provided by team members or shared with mentors or investors through a secure link.",
      },
      {
        step: "Export or Save",
        description:
          "Once the wireframe is ready, users can save it within the platform for further iteration or export it as an image, PDF, or shareable link to present to stakeholders.",
      },
      {
        step: "Project Management Dashboard",
        description:
          "Users have access to a dashboard where they can track all active and completed projects, manage team member roles, and view project history for easy iteration.",
      },
    ],
    profitablity: [
      {
        amount: "$500,000 - $1,000,000 annually",
        reason:
          "Based on a subscription model with tiers such as Free, Standard ($15/month), and Pro ($50/month). Targeting approximately 10,000 early-stage startups in the first year, with a conversion rate of 10% for paid tiers and scaling user base annually. As more features are added and demand for wireframing tools rises, recurring revenue will increase, making this platform a high-potential, scalable product in the SaaS market.",
      },
    ],
  };
  interface GptResponseContent {
    title: string;
    description: string;
    tech_stack: { name: string; description: string }[];
    pros: string[];
    cons: string[];
    monetization: string[];
    user_flow: { step: string; description: string }[];
    profitablity: { amount: string; reason: string }[];
    marketing: string[];
    pricing_plans: { amount: string; description: string }[];
  }

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const message = formData.get("input") as string;

    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    if (!message) {
      setIsLoading(false);
      return toast({
        variant: "destructive",
        title: "Kindly provide a message",
        description: "You need to provide a message to send",
      });
    }

    try {
      const response = await fetch(
        "http://localhost:3200/response/api/sendMessage",
        {
          method: "POST",
          body: JSON.stringify({ message, userId: user.id, isPrivate }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json(); // Getting the JSON response
        console.log("GPT Response:", result.data);
        console.log(typeof result.data);
        const parsedContent = JSON.parse(result.data.content);
        const content = {
          ...parsedContent,
          tech_stack: Array.isArray(parsedContent.tech_stack)
            ? parsedContent.tech_stack
            : [],
        };

        toast({
          title: "Success",
          description: "Received a project idea!",
        });
        console.log(content.tech_stack[0]);

        setGptResponse(content);
      } else {
        throw new Error("Failed to get a valid response.");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message to backend.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* <BackgroundBeams/> */}
      {/* <div className="absolute top-0 z-[-2] h-screen w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div> */}

      <div className="w-full rounded-md relative flex flex-col antialiased ">
        {isLoading ? (
          <SkeletonDemo />
        ) : (
          <div className="max-w-2xl h-screen py-20 mx-auto p-4 flex-col">
            <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
              Join the waitlist
            </h1>
            <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
              Welcome to GetTeck, a platform where user can generate project
              ideas and get detailed analysis of how you should start buidling
              this with right TechStack taking other factors like its cons, its
              pros and monitization into considerations .
            </p>

            <form className="grid w-full gap-2" onSubmit={handleSendMessage}>
              <BackgroundGradient className="rounded-[22px] p-4 sm:p-8 bg-white dark:bg-zinc-900">
                <textarea
                  className="w-full focus:outline-none resize-none bg-transparent text-sm"
                  placeholder="What's your great Idea ?"
                  translate="no"
                  style={{
                    minHeight: "76px",
                    maxHeight: "200px",
                    height: "76px",
                    overflowY: "hidden",
                  }}
                  id="ideaTextarea"
                  name="input"
                ></textarea>
              </BackgroundGradient>

              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "Virtual Pet Simulator",
                  "Quantum Computing Platform",
                  "Decentralized Social Network",
                  "AR Art Gallery",
                  "Blockchain Voting System",
                ].map((idea) => (
                  <a
                    key={idea}
                    className="cursor-pointer border rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-900 px-3 py-1 text-xs"
                    onClick={() => {
                      const textarea = document.getElementById(
                        "ideaTextarea"
                      ) as HTMLTextAreaElement;
                      if (textarea) {
                        textarea.value = idea;
                      }
                    }}
                  >
                    {idea}
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-4 justify-center my-4">
                <Switch
                  id="private-idea"
                  checked={isPrivate}
                  onCheckedChange={(checked) => setIsPrivate(checked)}
                />
                <Label htmlFor="private-idea">Private Idea</Label>
              </div>
              <div className="flex items-center gap-2">
                <Info size={"16px"} />
                <p className="text-left my-1 text-muted-foreground text-sm">
                  You have only 1 token to try is out, use wisely
                </p>
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  "Sending..."
                ) : (
                  <p className="flex items-center gap-3">
                    Send Message <CornerUpRight />
                  </p>
                )}
              </Button>
            </form>
          </div>
        )}

        {gptResponse && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-[calc(100vw-10%)] mx-auto"
            id="gptResponseSection"
          >
            <Card className="col-span-1 md:col-span-2 shadow-lg rounded-lg transition-transform duration-300 hover:scale-105">
              <CardHeader className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl font-semibold text-center">
                    Generated Project Idea
                  </CardTitle>
                  <CardDescription className="text-center">
                    Details of the generated project idea
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card className="shadow-md rounded-lg transition-shadow duration-300 hover:shadow-xl">
              <CardContent className="flex flex-col items-center justify-center h-full">
                <div className="flex justify-center w-full">
                  <h3 className="font-bold text-lg text-center">Title:</h3>
                </div>
                <p className="text-center">{gptResponse.title}</p>
              </CardContent>
            </Card>

            <Card className="shadow-md rounded-lg transition-shadow duration-300 hover:shadow-xl ">
              <CardContent className="flex flex-col items-center justify-center ">
                <div className="flex justify-center w-full">
                  <h3 className="font-bold text-lg text-left">Description:</h3>
                </div>
                <p className="text-left">{gptResponse.description}</p>
              </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2 shadow-md rounded-lg transition-shadow duration-300 hover:shadow-xl">
              <CardContent>
                <div className="flex justify-between w-full">
                  <h3 className="font-bold text-lg text-left">Tech Stack:</h3>
                  <Button variant="link" size="sm">
                    More details -
                  </Button>
                </div>
                <ul className="list-disc list-inside text-left">
                  {Array.isArray(gptResponse.tech_stack) &&
                    gptResponse.tech_stack.map(
                      (
                        tech: { name: string; description: string },
                        index: number
                      ) => (
                        <li key={index}>
                          <strong>{tech.name}:</strong> {tech.description}
                        </li>
                      )
                    )}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-md rounded-lg transition-shadow duration-300 hover:shadow-xl">
              <CardContent>
                <div className="flex justify-center w-full">
                  <h3 className="font-bold text-lg text-left">Pros:</h3>
                </div>
                <ul className="list-disc list-inside text-left">
                  {gptResponse.pros.map((pro, index) => (
                    <li key={index}>{pro}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-md rounded-lg transition-shadow duration-300 hover:shadow-xl">
              <CardContent>
                <div className="flex justify-between w-full">
                  <h3 className="font-bold text-lg text-left">Cons:</h3>
                  <Button variant="link" size="sm">
                    More details -
                  </Button>
                </div>
                <ul className="list-disc list-inside text-left">
                  {gptResponse.cons.map((con, index) => (
                    <li key={index}>{con}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2 shadow-md rounded-lg transition-shadow duration-300 hover:shadow-xl">
              <CardContent>
                <div className="flex justify-between w-full">
                  <h3 className="font-bold text-lg text-left">Monetization:</h3>
                  <Button variant="link" size="sm">
                    More details -
                  </Button>
                </div>
                <ul className="list-disc list-inside text-left">
                  {Array.isArray(gptResponse.monetization) &&
                    gptResponse.monetization.map((monetize: string, index: number) => (
                      <li key={index}>{monetize}</li>
                    ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-md rounded-lg transition-shadow duration-300 hover:shadow-xl">
              <CardContent>
                <div className="flex justify-between w-full">
                  <h3 className="font-bold text-lg text-left">
                    Marketing Strategies:
                  </h3>
                  <Button variant="link" size="sm">
                    More details -
                  </Button>
                </div>
                <ul className="list-disc list-inside text-left">
                  {Array.isArray(gptResponse.marketing) &&
                    gptResponse.marketing.map((market: string, index: number) => (
                      <li key={index}>{market}</li>
                    ))}
                  Get ready to explore trending marketing strategies filtered
                  with Artificial Intelligence for your project idea{" "}
                  <Link
                    href={"/pricing"}
                    className="text-muted-foreground hover:text-white"
                  >
                    Coming soon ...
                  </Link>
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-md rounded-lg transition-shadow duration-300 hover:shadow-xl">
              <CardContent>
                <div className="flex justify-center w-full">
                  <h3 className="font-bold text-lg text-left">Tackle Cons:</h3>
                </div>
                <ul className="list-disc list-inside text-left">
                  {gptResponse.marketing.map((market, index) => (
                    <li key={index}>{market}</li>
                  ))}
                  Having Cons in the project does sound great right ? Fix it not
                  by{" "}
                  <Link
                    href={"/pricing"}
                    className="text-muted-foreground hover:text-white"
                  >
                    Coming soon ...
                  </Link>
                </ul>
              </CardContent>
            </Card>
            <Card className="rounded-lg p-8 col-span-1 md:col-span-2">
              <CardTitle className="font-bold text-lg text-center">
                Project User Flow
              </CardTitle>
              <CardContent>
                <ul className="list-decimal list-outside text-left">
                  {Array.isArray(gptResponse.user_flow) &&
                    gptResponse.user_flow.map((flow, index) => (
                      <li key={index} className="pb-6">
                        <strong>{flow.step}:</strong> {flow.description}
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="rounded-lg p-8">
              <CardTitle className="font-bold text-lg text-center">
                Profitability
              </CardTitle>
              <CardContent>
                <ul className="list-decimal list-outside text-left">
                  <div>
                    {Array.isArray(gptResponse.profitablity) &&
                      gptResponse.profitablity.map((profit, index) => (
                        <div key={index}>
                          <div>
                            <strong>Amount:</strong> {profit.amount}
                          </div>
                          <br />
                          <div>
                            <strong>Reason:</strong> {profit.reason}
                          </div>
                        </div>
                      ))}
                  </div>
                </ul>
              </CardContent>
            </Card>
            <Card className="rounded-lg p-8">
              <CardTitle className="font-bold text-lg text-center">
                Pricing Plans
              </CardTitle>
              <CardContent>
                <ul className="list-decimal list-outside text-left">
                  {Array.isArray(gptResponse.pricing_plans) &&
                    gptResponse.pricing_plans.map((flow, index) => (
                      <li key={index} className="pb-6">
                        <strong>{flow.amount}:</strong> {flow.description}
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>
            <ExportToTxtButton gptResponse={gptResponse} />

            <Card className="col-span-1 md:col-span-2 shadow-lg rounded-lg">
              <CardFooter>
                <p className="text-center text-sm text-neutral-500">
                  End of project idea details
                </p>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}