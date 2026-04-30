function module(title, summary, slides) {
  return { title, summary, slides };
}

function slide(title, body, points, example = "") {
  return { title, body, points, example };
}

export const courses = [
  {
    slug: "css-component-styling",
    title: "CSS and Component Styling",
    shortTitle: "CSS",
    level: "Beginner to advanced",
    duration: "7 modules",
    accent: "linear-gradient(135deg, #156f5b, #33a884)",
    description:
      "A practical styling course that teaches CSS fundamentals, layout systems, responsive design, accessibility, and reusable component styling for modern web apps.",
    outcomes: ["CSS fundamentals", "Responsive layouts", "Component systems"],
    modules: [
      module("Introduction to CSS", "Learn how CSS turns document structure into a visual interface.", [
        slide(
          "What CSS Really Does",
          "CSS is the presentation layer of the web. HTML gives the page meaning and structure; CSS decides how that structure is displayed across different screens, themes, and interaction states.",
          [
            "CSS controls typography, color, spacing, borders, shadows, layout, and motion.",
            "A well-written stylesheet creates visual hierarchy so users know what to read, click, and ignore.",
            "Modern CSS is not only decoration; it is a core part of usability, accessibility, and product quality."
          ],
          "HTML says this is a button. CSS decides whether it feels like a primary action, a quiet secondary action, or a disabled control."
        ),
        slide(
          "Selectors, Declarations, and Rules",
          "A CSS rule has a selector and one or more declarations. The selector chooses elements, and each declaration applies a property-value pair.",
          [
            "Use class selectors for reusable interface styling.",
            "Use element selectors for broad defaults such as body text and links.",
            "Keep selectors shallow so components remain easy to move and reuse."
          ],
          ".course-card { padding: 24px; border: 1px solid #dfe6ef; }"
        ),
        slide(
          "The Cascade and Specificity",
          "The cascade determines which style wins when more than one rule targets the same element. Specificity, source order, inheritance, and importance all matter.",
          [
            "Inline styles beat most stylesheet rules, so use them only for dynamic values.",
            "Classes are usually the right level of specificity for component styling.",
            "If you constantly need !important, the stylesheet structure is fighting you."
          ],
          "Prefer .button.primary over #checkout-page .sidebar div button.primary."
        ),
        slide(
          "Professional CSS Habits",
          "Professional CSS is predictable. It uses naming, tokens, layout primitives, and consistent spacing instead of one-off fixes.",
          [
            "Create a small set of reusable colors, spacing values, and radii.",
            "Make states visible: hover, focus, active, disabled, loading, and error.",
            "Test layouts at mobile, tablet, laptop, and wide desktop widths."
          ]
        )
      ]),
      module("Box Model and Spacing", "Master the rectangle model behind every interface element.", [
        slide(
          "The Box Model",
          "Every element is rendered as a box with content, padding, border, and margin. Understanding this model makes layout bugs easier to diagnose.",
          [
            "Content is where text or children live.",
            "Padding creates internal space between content and border.",
            "Margin creates external space between independent elements."
          ],
          "button { padding: 12px 16px; border: 1px solid #156f5b; margin-top: 16px; }"
        ),
        slide(
          "Why border-box Matters",
          "The default content-box sizing can make widths confusing because padding and border are added after width is calculated. border-box makes sizing easier.",
          [
            "With border-box, width includes content, padding, and border.",
            "It prevents many cards, columns, and inputs from overflowing their containers.",
            "Most modern projects apply it globally with the universal selector."
          ],
          "* { box-sizing: border-box; }"
        ),
        slide(
          "Spacing Systems",
          "Good interfaces use repeated spacing values. This creates rhythm and reduces guesswork during implementation.",
          [
            "Use a scale such as 4, 8, 12, 16, 24, 32, 48, and 64.",
            "Use gap for spacing inside Flexbox and Grid containers.",
            "Use margin to separate sections, not to micromanage every child element."
          ]
        ),
        slide(
          "Common Spacing Mistakes",
          "Many messy layouts come from inconsistent spacing, collapsing margins, and children controlling too much outside space.",
          [
            "Avoid random values like 17px unless there is a clear design reason.",
            "Avoid putting large margins on reusable components that may appear in many contexts.",
            "Let parent layouts control the distance between repeated child items."
          ]
        )
      ]),
      module("Flexbox Layout", "Use Flexbox to align items in rows or columns.", [
        slide(
          "Main Axis and Cross Axis",
          "Flexbox arranges items along one primary direction. The main axis follows flex-direction, while the cross axis runs perpendicular to it.",
          [
            "flex-direction: row places items horizontally.",
            "flex-direction: column stacks items vertically.",
            "gap creates reliable space without margin hacks."
          ],
          ".toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; }"
        ),
        slide(
          "Alignment",
          "Flexbox alignment is powerful because it lets you control distribution and centering without fragile positioning.",
          [
            "justify-content controls the main axis.",
            "align-items controls the cross axis.",
            "align-self lets one child override the group alignment."
          ]
        ),
        slide(
          "Growing, Shrinking, and Wrapping",
          "Flex children can grow to fill space, shrink to fit, or wrap when the row becomes crowded.",
          [
            "flex: 1 lets an item take available space.",
            "flex-wrap: wrap prevents horizontal overflow in chip lists and button groups.",
            "min-width is often needed so content does not become unreadably narrow."
          ],
          ".card-list { display: flex; flex-wrap: wrap; gap: 16px; }"
        ),
        slide(
          "When Flexbox Is Best",
          "Use Flexbox for one-dimensional layouts: navigation bars, buttons with icons, form rows, media objects, and stacked component internals.",
          [
            "A button with an icon and text is a perfect Flexbox use case.",
            "A sidebar plus content can use Flexbox, but Grid is often clearer.",
            "For both rows and columns at the same time, consider CSS Grid."
          ]
        )
      ]),
      module("CSS Grid Layout", "Create two-dimensional page and card layouts.", [
        slide(
          "Grid Thinking",
          "CSS Grid controls rows and columns together. It is ideal when alignment matters in both directions.",
          [
            "Define columns with grid-template-columns.",
            "Use fr units to divide remaining space.",
            "Use minmax to create responsive tracks that do not collapse too far."
          ],
          ".course-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }"
        ),
        slide(
          "Responsive Grids",
          "A responsive grid should adapt without causing text to overflow or cards to become too narrow.",
          [
            "Use media queries to reduce column count on smaller screens.",
            "Use auto-fit with minmax for fluid galleries.",
            "Keep card content flexible so different text lengths still look intentional."
          ],
          "grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));"
        ),
        slide(
          "Page Structure",
          "Grid is excellent for major page regions such as sidebars, main content, inspector panels, and dashboards.",
          [
            "A common course layout is 320px for modules and 1fr for lecture content.",
            "Collapse sidebars above or below content on mobile.",
            "Use align-items: start when columns should not stretch awkwardly."
          ]
        ),
        slide(
          "Grid vs Flexbox",
          "Grid and Flexbox are partners. Grid is best for two-dimensional structure; Flexbox is best for aligning content inside a component.",
          [
            "Use Grid for the course card collection.",
            "Use Flexbox inside a course card header or button.",
            "Combining both is normal in production UI."
          ]
        )
      ]),
      module("Component Styling", "Build reusable interface pieces with predictable states.", [
        slide(
          "Component Boundaries",
          "A styled component should own its visual structure, but it should not assume too much about the page around it.",
          [
            "Buttons own padding, alignment, color, and states.",
            "Cards own border, background, radius, and internal spacing.",
            "Page layouts decide where components sit and how much space separates them."
          ]
        ),
        slide(
          "State Styling",
          "Real components need more than a default style. Users need feedback when they hover, focus, click, wait, or make an error.",
          [
            "Hover suggests that an element is interactive.",
            "Focus makes keyboard navigation visible.",
            "Disabled and loading states prevent unclear repeated actions."
          ],
          ".primary-button:focus { outline: 3px solid rgba(21, 111, 91, 0.25); }"
        ),
        slide(
          "Variants",
          "Variants let one component support multiple purposes without duplicating markup and styling.",
          [
            "Primary buttons should be reserved for the main action.",
            "Secondary or ghost buttons work for lower-priority actions.",
            "Danger variants should be visually distinct and used carefully."
          ]
        ),
        slide(
          "CSS Variables",
          "CSS variables make styling easier to theme and maintain. They work especially well for colors, spacing, shadows, and layout constants.",
          [
            "Declare global tokens in :root.",
            "Override variables inside themes or components.",
            "Use descriptive names such as --brand and --surface instead of --green."
          ],
          ":root { --brand: #156f5b; --space-4: 16px; }"
        )
      ]),
      module("Responsive and Accessible UI", "Design interfaces that work for more users and devices.", [
        slide(
          "Responsive Design Principles",
          "Responsive design is not only about shrinking a desktop layout. It is about preserving priority, readability, and interaction quality on every screen.",
          [
            "Use fluid widths instead of fixed widths for main content.",
            "Reduce columns when space becomes limited.",
            "Avoid viewport-based font scaling that makes text unpredictable."
          ]
        ),
        slide(
          "Readable Typography",
          "Readable interfaces use appropriate font sizes, line heights, contrast, and measure.",
          [
            "Body text should usually have line-height around 1.45 to 1.7.",
            "Long paragraphs need a comfortable max-width.",
            "Do not use low-contrast gray text for important instructions."
          ]
        ),
        slide(
          "Keyboard and Focus",
          "Many users navigate with a keyboard, switch device, or assistive technology. Focus styling is therefore essential.",
          [
            "Every interactive element should be reachable with Tab.",
            "Focus indicators must be visible against the background.",
            "Do not use divs as buttons when a real button is available."
          ]
        ),
        slide(
          "Touch and Pointer Targets",
          "Buttons, links, and controls need enough space for accurate interaction.",
          [
            "Keep important controls around 40px tall or larger.",
            "Do not place tiny links too close together.",
            "Maintain stable control dimensions so UI does not jump during interaction."
          ]
        )
      ]),
      module("Advanced CSS Architecture", "Organize styles for larger applications.", [
        slide(
          "Design Tokens",
          "Tokens are named design decisions. They help a team change the look of a product without hunting through hundreds of one-off values.",
          [
            "Color tokens describe roles such as background, surface, text, muted text, and accent.",
            "Spacing tokens create consistent rhythm.",
            "Shadow and radius tokens keep depth and shape consistent."
          ]
        ),
        slide(
          "Layering CSS",
          "Large stylesheets need order. You can think in layers: reset, base, layout, components, utilities, and page-specific exceptions.",
          [
            "Base styles define global defaults.",
            "Layout classes arrange regions.",
            "Component classes style reusable UI pieces."
          ]
        ),
        slide(
          "Avoiding Specificity Problems",
          "Specificity problems happen when selectors become too powerful and future changes require even stronger selectors.",
          [
            "Prefer class selectors over IDs for styling.",
            "Avoid long descendant chains.",
            "Use composition and variables instead of overriding the same property repeatedly."
          ]
        ),
        slide(
          "Production CSS Checklist",
          "Before shipping, review styling from the user's perspective and from the maintainer's perspective.",
          [
            "Check mobile, tablet, and desktop.",
            "Test keyboard navigation and focus states.",
            "Search for repeated magic values that should become tokens."
          ]
        )
      ])
    ]
  },
  {
    slug: "javascript",
    title: "JavaScript",
    shortTitle: "JS",
    level: "Beginner to advanced",
    duration: "7 modules",
    accent: "linear-gradient(135deg, #253858, #f5a524)",
    description:
      "A complete JavaScript path covering language fundamentals, functions, data structures, DOM events, async programming, modules, and advanced application patterns.",
    outcomes: ["Language fundamentals", "Async programming", "Application logic"],
    modules: [
      module("Introduction to JavaScript", "Understand where JavaScript runs and what problems it solves.", [
        slide("What JavaScript Is", "JavaScript is the programming language of the web. It runs in browsers, servers, command-line tools, desktop apps, and mobile frameworks.", ["In the browser, JavaScript reacts to users and updates the page.", "On the server, JavaScript can handle APIs, databases, and authentication.", "In frameworks like Next.js, JavaScript powers both UI and backend routes."]),
        slide("Variables and Values", "Variables store values so your program can remember and transform information.", ["Use const for values that should not be reassigned.", "Use let for values that need to change.", "Avoid var in modern code because function scoping can create surprises."], "const courseTitle = 'JavaScript'; let currentSlide = 1;"),
        slide("Primitive Types", "The most common primitive values are strings, numbers, booleans, null, undefined, bigint, and symbols.", ["Strings represent text.", "Numbers represent integers and decimals.", "Booleans represent true or false decisions."]),
        slide("Control Flow", "Control flow lets your program make decisions and repeat work.", ["if statements choose between branches.", "Loops repeat tasks.", "Return statements stop a function and send back a value."], "if (score >= 70) { status = 'passed'; }")
      ]),
      module("Functions and Scope", "Write reusable logic and understand variable visibility.", [
        slide("Function Purpose", "A function packages a task behind a name. Good functions make code easier to read, test, and reuse.", ["Functions should usually do one clear job.", "Parameters are inputs.", "Return values are outputs."], "function calculateProgress(done, total) { return Math.round((done / total) * 100); }"),
        slide("Arrow Functions", "Arrow functions are commonly used for callbacks, React handlers, and concise transformations.", ["They are shorter than function declarations.", "They preserve lexical this behavior.", "They work well with array methods like map and filter."], "const activeCourses = courses.filter((course) => course.active);"),
        slide("Scope", "Scope defines where a variable can be accessed. JavaScript has global scope, function scope, and block scope.", ["Variables declared inside a block with let or const stay inside that block.", "Functions can read variables from outer scopes.", "Avoid global variables because they are easy to accidentally change."]),
        slide("Closures", "A closure happens when a function remembers variables from the scope where it was created.", ["Closures power event handlers and factory functions.", "They allow private state.", "They are useful but can confuse beginners when values change over time."])
      ]),
      module("Arrays and Objects", "Model and transform application data.", [
        slide("Arrays", "Arrays store ordered lists. They are used for course lists, modules, comments, cart items, notifications, and more.", ["Use map to transform every item.", "Use filter to keep selected items.", "Use find to retrieve one matching item."], "const titles = courses.map((course) => course.title);"),
        slide("Objects", "Objects store named properties. Most data from APIs and databases is represented as objects.", ["Use dot notation for known property names.", "Use bracket notation for dynamic property names.", "Use destructuring to extract values clearly."], "const { title, modules } = course;"),
        slide("Immutable Updates", "In React and many modern patterns, update arrays and objects by creating new values rather than mutating old ones.", ["Use spread syntax to copy objects.", "Use map to update one item in an array.", "Avoid push, splice, or direct property changes on state values."]),
        slide("Data Modeling", "Good JavaScript starts with clear data shape. Before coding a feature, decide what fields each object needs.", ["A course needs slug, title, description, and modules.", "A module needs title, summary, and slides.", "A user needs name, email, password hash, and enrolled courses."])
      ]),
      module("DOM and Events", "Connect JavaScript to user interaction.", [
        slide("The DOM", "The Document Object Model is the browser's live tree representation of HTML. JavaScript can read and modify it.", ["React usually updates the DOM for you.", "Understanding the DOM helps debug UI behavior.", "DOM updates should be intentional because they affect performance."]),
        slide("Events", "Events are signals that something happened: a click, keypress, input change, form submission, or network response.", ["Event handlers run when the event occurs.", "Forms often need preventDefault to avoid page reloads.", "Accessible controls should use real button, input, and link elements."], "button.addEventListener('click', handleClick);"),
        slide("Stateful Interfaces", "Interactive apps need state: the current user, selected course, active module, slide index, form values, and loading flags.", ["State should have one source of truth.", "Avoid duplicating the same value in multiple places.", "Update state in response to events."]),
        slide("Forms", "Forms collect structured input. Good form code validates data, shows errors, handles loading, and sends a request to the server.", ["Validate on the client for quick feedback.", "Validate again on the server for security.", "Never trust client input by itself."])
      ]),
      module("Async JavaScript", "Work with promises, APIs, and delayed results.", [
        slide("Why Async Exists", "Many operations take time: database queries, API requests, file uploads, timers, and authentication checks.", ["JavaScript uses asynchronous patterns to avoid freezing the page.", "A Promise represents a future result.", "async and await make Promise code easier to read."]),
        slide("Promises", "A Promise can be pending, fulfilled, or rejected.", ["then handles success.", "catch handles errors.", "finally runs after success or failure."], "fetch('/api/auth/me').then((res) => res.json());"),
        slide("async and await", "An async function returns a Promise. await pauses that function until the Promise settles.", ["Use try/catch around awaited operations that can fail.", "Show loading states while waiting.", "Do not ignore failed network requests."], "const response = await fetch('/api/auth/login', { method: 'POST' });"),
        slide("API Communication", "Frontend code talks to backend routes using HTTP requests. The server validates input, talks to the database, and returns JSON.", ["POST is common for login, signup, and enrollment.", "GET is common for reading the current session.", "Status codes help the client understand success or failure."])
      ]),
      module("Modules and Tooling", "Organize JavaScript into maintainable project files.", [
        slide("ES Modules", "Modules let JavaScript files share code through imports and exports.", ["Default exports are common for pages and components.", "Named exports are useful for utilities and data.", "Keep module responsibilities focused."], "export function getCourse(slug) { return courses.find((course) => course.slug === slug); }"),
        slide("Next.js Project Structure", "Next.js uses the app directory for routes, layouts, API handlers, and nested pages.", ["app/page.js is the home page.", "app/login/page.js is the login route.", "app/api/auth/login/route.js is a backend API route."]),
        slide("Environment Variables", "Secrets such as database URLs and auth signing keys belong in .env.local, not in source code.", ["Never commit real credentials.", "Use .env.example to show required variables.", "Restart the dev server after changing environment variables."]),
        slide("Developer Workflow", "A reliable workflow includes local development, linting, builds, and testing important behavior.", ["Run npm run dev while building.", "Run npm run build before deployment.", "Check login, signup, protected pages, and database writes."])
      ]),
      module("Advanced Application Patterns", "Design reliable JavaScript applications.", [
        slide("Separation of Concerns", "A maintainable app separates UI, data, server logic, and security-sensitive behavior.", ["Client components handle interaction.", "API routes handle validation and database operations.", "Library files hold reusable server utilities."]),
        slide("Error Handling", "Production-quality JavaScript expects things to fail: invalid input, expired sessions, network errors, and database problems.", ["Return useful error messages without leaking secrets.", "Use status codes consistently.", "Show users what they can do next."]),
        slide("Performance", "Performance is about doing less work, doing it later, or doing it closer to where it is needed.", ["Avoid unnecessary state changes.", "Fetch only the data required for the screen.", "Keep large static course content outside frequently changing components."]),
        slide("Security Mindset", "JavaScript apps need defensive habits because user input, authentication, and database calls create risk.", ["Hash passwords before storing them.", "Use HTTP-only cookies for sessions.", "Validate all server inputs even if the client already checked them."])
      ])
    ]
  },
  {
    slug: "oauth",
    title: "OAuth Authentication",
    shortTitle: "OAuth",
    level: "Intermediate",
    duration: "7 modules",
    accent: "linear-gradient(135deg, #244c8f, #14a38b)",
    description:
      "A clear OAuth course covering authorization concepts, actors, authorization code flow, scopes, tokens, security controls, and Next.js integration planning.",
    outcomes: ["OAuth concepts", "Token security", "Auth architecture"],
    modules: [
      module("Introduction to OAuth", "Understand what OAuth solves and what it does not solve by itself.", [
        slide("The Problem OAuth Solves", "OAuth lets a user grant an application limited access to a resource without giving that application their password.", ["A calendar app can ask for permission to read calendar events.", "A deployment tool can ask for permission to read repositories.", "The user can revoke access without changing their password."]),
        slide("Authorization vs Authentication", "OAuth is mainly about authorization: what an app can access. Authentication proves who the user is. OpenID Connect adds identity on top of OAuth.", ["OAuth answers what access is allowed.", "OpenID Connect answers who signed in.", "Social login usually combines OAuth and OpenID Connect."]),
        slide("Why This Matters", "Confusing OAuth with login leads to insecure designs. A secure app understands which token proves identity and which token authorizes API access.", ["Access tokens are for APIs.", "ID tokens are for identity claims.", "Session cookies are often used by your own app after login."]),
        slide("Real-World Example", "When a user signs in with Google, your app redirects them to Google, receives a response, validates it, and creates an app session.", ["The provider handles the password.", "Your app receives trusted identity information.", "Your app should still manage its own session carefully."])
      ]),
      module("OAuth Actors", "Identify each participant in an OAuth flow.", [
        slide("Resource Owner", "The resource owner is usually the user. They own the data or account access being requested.", ["They approve or deny consent.", "They can often revoke access later.", "Their browser is redirected during many OAuth flows."]),
        slide("Client Application", "The client is the app requesting access. It may be a server-rendered web app, single-page app, mobile app, CLI, or backend service.", ["Confidential clients can keep secrets on the server.", "Public clients cannot safely keep a secret.", "The client must be registered with the provider."]),
        slide("Authorization Server", "The authorization server authenticates the user, shows consent, and issues codes or tokens.", ["Examples include Google, GitHub, Microsoft, and Auth0.", "It validates redirect URIs.", "It enforces provider security rules."]),
        slide("Resource Server", "The resource server hosts the protected API. It accepts valid access tokens and returns authorized data.", ["A GitHub API endpoint is a resource server.", "It checks token validity and scope.", "It should reject missing, expired, or insufficient tokens."])
      ]),
      module("Authorization Code Flow", "Learn the standard secure OAuth flow for web apps.", [
        slide("Step 1: Start the Redirect", "The app sends the user to the authorization server with parameters such as client_id, redirect_uri, response_type, scope, and state.", ["The user leaves your app temporarily.", "The provider authenticates the user.", "The provider asks for consent if needed."]),
        slide("Step 2: Receive the Code", "After approval, the provider redirects the user back to your callback URL with an authorization code.", ["The code is temporary.", "The callback must verify the state parameter.", "A code is not the same as an access token."]),
        slide("Step 3: Exchange the Code", "Your server exchanges the code for tokens by calling the provider directly.", ["This keeps secrets away from the browser.", "The provider returns an access token and possibly refresh and ID tokens.", "Failed exchanges should stop the login process."]),
        slide("Step 4: Create Your Session", "Most web apps create their own session after provider login succeeds.", ["Store the app session in an HTTP-only cookie.", "Store provider tokens only if your app needs them later.", "Never expose refresh tokens to client JavaScript."])
      ]),
      module("Scopes and Consent", "Request permissions carefully.", [
        slide("What Scopes Are", "Scopes are permission labels that describe the access your app wants.", ["openid asks for OpenID Connect identity behavior.", "email asks for email information.", "A provider may define many custom API scopes."]),
        slide("Least Privilege", "Ask only for what your feature needs. Smaller permission requests are safer and easier for users to trust.", ["Do not ask for repository write access if read access is enough.", "Do not ask for profile data if only email is needed.", "Review scopes whenever features change."]),
        slide("Consent Experience", "The consent screen is part of user trust. It should match the real app name, domain, and requested permissions.", ["Suspicious app names reduce trust.", "Mismatched domains can cause provider rejection.", "Production providers may require verification."]),
        slide("Scope Changes", "Adding scopes later may require users to consent again.", ["Plan permissions around product milestones.", "Handle denied consent gracefully.", "Explain why a permission is needed before redirecting."])
      ]),
      module("Tokens", "Understand the different token types and their responsibilities.", [
        slide("Access Tokens", "Access tokens authorize calls to resource servers. They are often short-lived because stolen access tokens can be abused.", ["Treat them like credentials.", "Send them only to the API they are meant for.", "Do not store them in localStorage for sensitive apps."]),
        slide("Refresh Tokens", "Refresh tokens can obtain new access tokens without making the user sign in again.", ["They are more sensitive than access tokens.", "Store them securely on the server.", "Use rotation if the provider supports it."]),
        slide("ID Tokens", "ID tokens are part of OpenID Connect. They contain identity claims about the authenticated user.", ["Validate issuer, audience, expiration, and signature.", "Use ID tokens to establish identity.", "Do not use ID tokens as API access tokens."]),
        slide("Expiration and Revocation", "Tokens should expire, and users or providers should be able to revoke them.", ["Short expiration limits damage.", "Revocation helps after suspicious activity.", "Apps should handle expired tokens without breaking the whole experience."])
      ]),
      module("Security Essentials", "Protect OAuth flows from common attacks.", [
        slide("State Parameter", "The state parameter protects against cross-site request forgery during OAuth redirects.", ["Generate a random state before redirecting.", "Store it in a secure cookie or server session.", "Compare it when the provider redirects back."]),
        slide("PKCE", "Proof Key for Code Exchange protects authorization code flows, especially for public clients.", ["The app creates a code verifier.", "It sends a derived code challenge during authorization.", "It proves possession of the verifier during token exchange."]),
        slide("Redirect URI Control", "Providers require registered redirect URIs to prevent attackers from stealing codes.", ["Use exact redirect URI matching.", "Avoid broad wildcards.", "Use separate redirect URIs for local, staging, and production."]),
        slide("Token Storage", "Where tokens live is a major security decision.", ["Prefer server-side storage for sensitive tokens.", "Use HTTP-only cookies for app sessions.", "Avoid exposing tokens to third-party scripts."])
      ]),
      module("OAuth in Next.js", "Plan a secure OAuth architecture in a Next.js app.", [
        slide("Route Responsibilities", "A Next.js OAuth setup normally needs a start route and a callback route.", ["The start route creates state and redirects to the provider.", "The callback route verifies state and exchanges the code.", "The app creates a session after successful verification."]),
        slide("Server-Side Secrets", "Client secrets must never be shipped to the browser. Keep them inside route handlers, server actions, or backend services.", ["Use environment variables.", "Do not prefix secrets with NEXT_PUBLIC.", "Restart the server after changing secret values."]),
        slide("Sessions", "After OAuth succeeds, your app usually stores a session cookie that identifies the logged-in user.", ["Use HTTP-only cookies.", "Set secure cookies in production.", "Expire sessions intentionally."]),
        slide("Using Libraries", "For production OAuth, mature libraries reduce mistakes. Even then, understanding the flow helps you debug and configure safely.", ["Auth.js is commonly used with Next.js.", "Provider SDKs can help with token validation.", "Custom implementations need careful security review."])
      ]),
      module("Advanced Production Topics", "Handle real-world OAuth complexity.", [
        slide("Account Linking", "Users may sign in with different providers that share the same email. Account linking must be designed carefully.", ["Verify email ownership.", "Avoid automatic linking that enables account takeover.", "Let users manage connected providers."]),
        slide("Provider Differences", "OAuth providers vary in scopes, token format, refresh behavior, and profile data.", ["Read provider documentation carefully.", "Do not assume all providers return the same fields.", "Normalize provider profiles into your own user model."]),
        slide("Logout", "Logout can mean clearing your app session, the provider session, or both.", ["Clearing the app session is required.", "Provider logout is not always available or desirable.", "Explain session behavior clearly to users."]),
        slide("Monitoring and Incident Response", "Authentication systems need logs, alerts, and recovery paths.", ["Log failed login and token exchange errors carefully.", "Do not log secrets or raw tokens.", "Have a way to revoke sessions after compromise."])
      ])
    ]
  }
];

export function getCourse(slug) {
  return courses.find((course) => course.slug === slug);
}
