
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Download, Sparkles } from "lucide-react";
import { toast } from "sonner";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageHistory, setImageHistory] = useState<Array<{url: string, prompt: string}>>([]);

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to generate an image");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate API call - replace with actual image generation API
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // For demo purposes, using a placeholder image service
      const imageUrl = `https://picsum.photos/512/512?random=${Date.now()}`;
      
      setGeneratedImage(imageUrl);
      setImageHistory(prev => [{url: imageUrl, prompt}, ...prev.slice(0, 4)]);
      
      toast.success("Image generated successfully!");
    } catch (error) {
      toast.error("Failed to generate image. Please try again.");
      console.error("Image generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `ai-generated-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Prompt Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Generate Your Image
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe the image you want to generate... (e.g., 'A majestic mountain landscape at sunset with snow-capped peaks')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <Button 
            onClick={generateImage} 
            disabled={isGenerating || !prompt.trim()}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Image...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Image
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Image Display */}
      {generatedImage && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Generated Image</CardTitle>
              <Button variant="outline" onClick={downloadImage}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <img
                src={generatedImage}
                alt="Generated image"
                className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-600 text-center italic">
                "{prompt}"
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image History */}
      {imageHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Generations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {imageHistory.map((item, index) => (
                <div key={index} className="space-y-2">
                  <img
                    src={item.url}
                    alt={`Generated ${index + 1}`}
                    className="w-full aspect-square object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setGeneratedImage(item.url)}
                  />
                  <p className="text-xs text-gray-500 truncate" title={item.prompt}>
                    {item.prompt}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageGenerator;
