NAME = "02 - Jev Are We Overpaying for Claude"
CAPTION_HL = {"jev"}

LINES = [
    ("hook", "There's a new AI model called Jev. It doesn't chat, it doesn't write code, it doesn't generate a single word of text. And the first time I heard 'decision-only model,' I thought — isn't everything an LLM now? What does that even mean?"),
    ("l1", "Think about it this way. Say you've got an AI agent handling support tickets. All day long it's asking itself: is this spam? Should I retry that failed call? Which tool do I use next? Does a human need to see this? Thousands of tiny decisions — and right now, each one is burning flagship-model money."),
    ("l2", "Jev just answers the question without the chatbot. You hand it the possible answers up front, and it picks one, with a probability score. It's literally just a multiple-choice exam, but for agents."),
    ("l3", "It was built by Diogo Almeida — former OpenAI researcher, worked on the {RLHF|R L H F} research that taught ChatGPT to follow instructions. One of the people who helped build the chatbot era is now betting the next era isn't chatbots at all."),
    ("l4", "Now you might think — why not just use a smaller, cheaper chatbot? Technically you could. But a chatbot can still invent an answer you never gave it, or break your output format. Jev's outputs are locked to a schema. It can pick the wrong option — but it can't wander off-script."),
    ("l5", "TypeSafe, the company behind it, calls Jev a 'System One' model. Scary name, stay with me — it just means fast, instinctive decisions instead of slow word-by-word thinking. Your gut versus writing an essay."),
    ("l6", "And it's fast — TypeSafe claims up to 50 times faster than a chatbot on these decision calls. But here's the limit: ask Jev to write an essay and it gives you nothing. So this isn't Claude versus Jev. It's Claude for the thinking, Jev for the choosing."),
    ("l7", "So the uncomfortable question: || how many of your Claude calls are just decisions wearing a chatbot costume? The most expensive model isn't always the smartest move. Sometimes it's just the most expensive. || Kind of a high-level take — it helps me make sense of it, hopefully it helps you too."),
]
END_HOLD = 3.4
