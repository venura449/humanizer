// AI Text Humanizer - Pure JavaScript Implementation

class TextHumanizer {
    constructor() {
        this.aiPatterns = {
            "in conclusion": ["so", "ultimately", "at the end of the day", "basically"],
            "it is important to note": [
                "importantly",
                "notably",
                "one thing to note",
                "keep in mind",
            ],
            "it is worth noting": ["it's worth noting", "notably", "worth remembering"],
            furthermore: ["plus", "and", "also", "on top of that"],
            moreover: ["and", "plus", "also", "what's more"],
            "in summary": ["so", "basically", "to sum up", "ultimately"],
            nevertheless: ["still", "but", "yet", "though"],
            additionally: ["also", "plus", "and", "on top of that"],
            substantially: ["significantly", "quite a bit", "really"],
            "optimizing outcomes": [
                "getting better results",
                "making things better",
                "improving things",
            ],
            "crucial for": ["essential for", "key to", "vital for", "important for"],
            "in today's .* world": ["today", "nowadays", "these days", "right now"],
            "delve into": ["dig into", "explore", "look at", "get into"],
            facilitate: ["make easier", "help", "enable", "allow"],
            leverage: ["use", "take advantage of", "harness"],
            utilize: ["use", "make use of", "employ"],
        };

        this.formality = {
            casual: {
                contractions: true,
                informal: true,
                connectors: ["and", "but", "so", "but then", "honestly"],
            },
            professional: {
                contractions: false,
                informal: false,
                connectors: ["however", "therefore", "as a result", "in addition"],
            },
            academic: {
                contractions: false,
                informal: false,
                connectors: ["furthermore", "moreover", "consequently", "hence"],
            },
            creative: {
                contractions: true,
                informal: true,
                connectors: ["and", "so", "but", "yet", "still"],
            },
            simple: {
                contractions: true,
                informal: true,
                connectors: ["and", "but", "so", "then", "also"],
            },
        };
    }

    replaceAIPatterns(text, style) {
        let result = text;

        // Replace common AI phrases
        Object.entries(this.aiPatterns).forEach(([pattern, replacements]) => {
            const regex = new RegExp(`\\b${pattern}\\b`, "gi");
            result = result.replace(regex, () => {
                return replacements[Math.floor(Math.random() * replacements.length)];
            });
        });

        return result;
    }

    addContractions(text, style) {
        if (!this.formality[style].contractions) return text;

        const contractionMap = {
            "is not": "isn't",
            "are not": "aren't",
            "will not": "won't",
            "cannot": "can't",
            "could not": "couldn't",
            "should not": "shouldn't",
            "would not": "wouldn't",
            "have not": "haven't",
            "has not": "hasn't",
            "do not": "don't",
            "does not": "doesn't",
            "did not": "didn't",
            "it is": "it's",
            "that is": "that's",
            "there is": "there's",
            "there are": "there're",
            "what is": "what's",
            "where is": "where's",
            "who is": "who's",
            "you are": "you're",
            "we are": "we're",
            "they are": "they're",
            "you will": "you'll",
            "we will": "we'll",
            "they will": "they'll",
            "you would": "you'd",
            "we would": "we'd",
            "they would": "they'd",
            "should have": "should've",
            "would have": "would've",
            "could have": "could've",
        };

        let result = text;
        Object.entries(contractionMap).forEach(([full, short]) => {
            const regex = new RegExp(`\\b${full}\\b`, "gi");
            result = result.replace(regex, short);
        });

        return result;
    }

    varyVocabulary(text) {
        const synonyms = {
            important: ["key", "critical", "vital", "significant", "crucial"],
            good: ["effective", "solid", "great", "excellent", "strong"],
            bad: ["poor", "weak", "flawed", "problematic", "concerning"],
            show: ["demonstrate", "reveal", "indicate", "display", "illustrate"],
            make: ["create", "produce", "build", "develop", "generate"],
            think: ["believe", "consider", "reckon", "figure", "suppose"],
            get: ["obtain", "acquire", "receive", "secure", "grab"],
            give: ["provide", "offer", "deliver", "supply", "share"],
        };

        let result = text;
        Object.entries(synonyms).forEach(([word, alternatives]) => {
            const regex = new RegExp(`\\b${word}\\b`, "gi");
            const matches = text.match(regex);

            if (matches && matches.length > 1) {
                let useCount = 0;
                result = result.replace(regex, () => {
                    useCount++;
                    // Keep some original, replace others
                    if (useCount % 3 === 0) {
                        return alternatives[Math.floor(Math.random() * alternatives.length)];
                    }
                    return word;
                });
            }
        });

        return result;
    }

    varysentenceStructure(text, intensity) {
        const sentences = text.match(
            /[^.!?]+[.!?]+|[^.!?]+$/g
        ) || [text];

        if (sentences.length < 2) return text;

        // For light intensity, make minimal changes
        if (intensity === "light") {
            return sentences.join(" ");
        }

        // For medium/heavy, vary sentence structure
        const modified = sentences.map((sent, idx) => {
            let trimmed = sent.trim();

            if (trimmed.length < 20) return trimmed;

            // Occasionally move descriptive phrases
            if (intensity === "heavy" && Math.random() > 0.5) {
                // Try to identify and move modifiers
                const withComma = trimmed.replace(/,\s+/g, ". ");
                if (Math.random() > 0.5) return withComma;
            }

            return trimmed;
        });

        return modified.join(" ");
    }

    addNaturalConnectors(text, style) {
        const connectors = this.formality[style].connectors;
        const sentences = text.match(
            /[^.!?]+[.!?]+|[^.!?]+$/g
        ) || [text];

        if (sentences.length < 3) return text;

        // Add occasional connectors at sentence starts
        const modified = sentences.map((sent, idx) => {
            if (idx === 0) return sent.trim();

            const trimmed = sent.trim();
            const startsWithConnector = /^(and|but|so|yet|however|therefore)/i.test(
                trimmed,
            );

            if (!startsWithConnector && Math.random() > 0.6) {
                const connector = connectors[Math.floor(Math.random() * connectors.length)];
                return `${connector.charAt(0).toUpperCase() + connector.slice(1).toLowerCase()} ${trimmed}`;
            }

            return trimmed;
        });

        return modified.join(" ");
    }

    removeFormalPhrasing(text) {
        const formalPatterns = {
            "the fact that": "",
            "due to the fact that": "because",
            "despite the fact that": "even though",
            "in order to": "to",
            "a large number of": "many",
            "a significant portion of": "much of",
            "subsequent to": "after",
        };

        let result = text;
        Object.entries(formalPatterns).forEach(([pattern, replacement]) => {
            const regex = new RegExp(`\\b${pattern}\\b`, "gi");
            result = result.replace(regex, replacement);
        });

        return result;
    }

    randomizeCase(text) {
        // Preserve sentence case but add some natural variation
        return text.replace(/(?:^|\.\s+)([a-z])/g, (match, letter) => {
            return match.replace(letter, letter.toUpperCase());
        });
    }

    humanize(text, intensity = "medium", style = "casual") {
        if (!text || text.trim().length === 0) return "";

        let result = text;

        // Apply transformations based on intensity
        if (intensity === "light") {
            // Light: minimal changes
            result = this.replaceAIPatterns(result, style);
            result = this.addContractions(result, style);
        } else if (intensity === "medium") {
            // Medium: balanced changes
            result = this.replaceAIPatterns(result, style);
            result = this.removeFormalPhrasing(result);
            result = this.addContractions(result, style);
            result = this.addNaturalConnectors(result, style);
            result = this.varyVocabulary(result);
        } else if (intensity === "heavy") {
            // Heavy: aggressive changes
            result = this.replaceAIPatterns(result, style);
            result = this.removeFormalPhrasing(result);
            result = this.addContractions(result, style);
            result = this.addNaturalConnectors(result, style);
            result = this.varyVocabulary(result);
            result = this.varysentenceStructure(result, intensity);
        }

        return result.trim();
    }
}

// Export for use
if (typeof module !== "undefined" && module.exports) {
    module.exports = TextHumanizer;
}
