import React, { useState } from "react";
import { Box, Button, Textarea, VStack, Text } from "@chakra-ui/react";
import { create } from "lib/openai"; // Assuming this is correctly set up for API calls

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSummarize = async () => {
    if (!inputText.trim()) return;

    const response = await create({
      messages: [{ role: "user", content: inputText }],
      model: "gpt-3.5-turbo",
      instructions: "Provide a summary",
      temperature: 0.3,
    });

    if (response && response.choices && response.choices.length > 0) {
      setSummary(response.choices[0].message.content);
    }
  };

  return (
    <VStack spacing={4} p={5}>
      <Text fontSize="xl" fontWeight="bold">
        Text Summarizer
      </Text>
      <Textarea placeholder="Enter your text here..." value={inputText} onChange={handleInputChange} size="sm" />
      <Button colorScheme="blue" onClick={handleSummarize}>
        Summarize
      </Button>
      <Textarea placeholder="Summary will appear here..." value={summary} isReadOnly size="sm" />
    </VStack>
  );
};

export default Index;
