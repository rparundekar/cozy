import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function CozyPage() {
  // Example data (replace with your own)
  const [searchTerm, setSearchTerm] = useState("");
  const userName = "Rahul";
  const userPhotoURL = "https://via.placeholder.com/36"; // Replace with real avatar URL
  const personas = [
    { id: "AIHero", label: "Rahul @AI Hero" },
    { id: "Elevate", label: "Rahul @Elevate" },
    { id: "Personal", label: "Rahul (Personal)" },
  ];
  const people = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];
  const groups = [
    { id: "teamA", label: "Team A" },
    { id: "friends", label: "Friends" },
  ];

  // Simulate currently selected person's data
  const selectedPerson = {
    name: "Alice",
    photoURL: "https://via.placeholder.com/36?text=A",
    highlight: "Recently traveled to Japan!",
    personas: [
      { id: "work", label: "Alice @Work" },
      { id: "personal", label: "Alice (Personal)" },
    ],
    notes: "Met Alice at a conference. Follow up about her new startup idea.",
    aiInsights: [
      "Shared a new blog post about AI ethics.",
      "Looking for help with a design project.",
    ],
  };

  return (
    <div className="flex min-h-screen bg-muted">
      {/** Left Column: User info, profiles, groups, and people list **/}
      <aside className="w-64 border-r border-border bg-background flex flex-col">
        {/* Top: User */}
        <div className="p-4 flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={userPhotoURL} alt={userName} />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{userName}</p>
            <p className="text-sm text-muted-foreground">View profile</p>
          </div>
        </div>
        <Separator />

        {/* Your Profiles (Personas) */}
        <div className="p-4">
          <p className="font-medium mb-2">Your Profiles</p>
          <ul className="space-y-1">
            {personas.map((persona) => (
              <li key={persona.id}>
                <Button variant="ghost" className="w-full justify-start">
                  {persona.label}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <Separator />

        {/* Groups / Communities */}
        <div className="p-4">
          <p className="font-medium mb-2">Groups / Communities</p>
          <ul className="space-y-1">
            {groups.map((group) => (
              <li key={group.id}>
                <Button variant="ghost" className="w-full justify-start">
                  {group.label}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <Separator />

        {/* Search and People List */}
        <div className="p-4 flex-1 flex flex-col">
          <p className="font-medium mb-2">People</p>
          <Input
            placeholder="Search people..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-2"
          />
          <ScrollArea className="flex-1">
            <ul className="space-y-1">
              {people
                .filter((person) =>
                  person.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((person) => (
                  <li key={person.id}>
                    <Button variant="outline" className="w-full justify-start">
                      {person.name}
                    </Button>
                  </li>
                ))}
            </ul>
          </ScrollArea>
        </div>
      </aside>

      {/** Center Column: Person's context, conversation, and notes **/}
      <main className="flex-1 p-4 space-y-4 overflow-hidden flex flex-col">
        {/** Top: Tabs for selected person's personas **/}
        <Tabs
          defaultValue={selectedPerson.personas[0].id}
          className="flex flex-col flex-1"
        >
          <TabsList className="flex-shrink-0">
            {selectedPerson.personas.map((p) => (
              <TabsTrigger key={p.id} value={p.id}>
                {p.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {selectedPerson.personas.map((p) => (
            <TabsContent
              key={p.id}
              value={p.id}
              className="flex-1 flex flex-col space-y-4"
            >
              {/* Top fold: recent highlights from their social or context */}
              <Card>
                <CardHeader>
                  <CardTitle>What's new with {selectedPerson.name}?</CardTitle>
                  <CardDescription>{selectedPerson.highlight}</CardDescription>
                </CardHeader>
              </Card>

              {/* Below fold: your notes / conversation area */}
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Notes / Conversation</CardTitle>
                </CardHeader>
                <CardContent className="overflow-auto flex-1">
                  <p>{selectedPerson.notes}</p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {/** Right Column: Person's photo, name, AI Insights, etc. **/}
      <aside className="w-64 border-l border-border bg-background p-4 flex flex-col space-y-4">
        {/* Person's Basic Info */}
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage
              src={selectedPerson.photoURL}
              alt={selectedPerson.name}
            />
            <AvatarFallback>
              {selectedPerson.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{selectedPerson.name}</p>
            <p className="text-sm text-muted-foreground">Connection details</p>
          </div>
        </div>
        <Separator />

        {/* AI-Generated Insights */}
        <div className="flex-1">
          <p className="font-medium mb-2">AI Insights</p>
          <ScrollArea className="h-full">
            <ul className="space-y-2">
              {selectedPerson.aiInsights.map((insight, i) => (
                <li key={i}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Insight #{i + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{insight}</p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      </aside>
    </div>
  );
}
