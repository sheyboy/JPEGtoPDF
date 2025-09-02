import React from 'react';

const CodeBlock: React.FC<{ language: string; code: string }> = ({ language, code }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    return (
        <div className="bg-slate-900 rounded-lg my-4">
            <div className="flex justify-between items-center px-4 py-2 bg-slate-700/50 rounded-t-lg">
                <span className="text-xs font-sans text-slate-400">{language}</span>
                <button
                    onClick={handleCopy}
                    className="text-xs font-sans text-slate-300 hover:text-white transition-colors"
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <pre className="p-4 overflow-x-auto">
                <code className={`language-${language} text-sm text-slate-200`}>{code}</code>
            </pre>
        </div>
    );
};

export const ApiDocs: React.FC = () => {
    const jsonExample = `{
  "images": [
    "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
    "data:image/jpeg;base64,/9j/2wBDAAMCAg..."
  ]
}`;

    const curlExample = `curl -X POST https://your-service-url.com/api/convert \\
  -H "Content-Type: application/json" \\
  -d '{ "images": ["data:image/jpeg;base64,..."] }' \\
  --output result.pdf`;

    return (
        <div className="text-slate-600 dark:text-slate-300 font-sans text-sm sm:text-base">
            <p className="mb-4">
                You can integrate our JPEG to PDF functionality into your own applications by calling our API endpoint.
                This allows for programmatic conversion without using the web interface.
            </p>
            <p className="mb-6">
                Note: This application performs all conversions directly in your browser; no files are sent to a server. The following is a specification for a hypothetical backend API. This demonstrates how you could build a similar service using any server-side technology of your choice.
            </p>
            
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">API Endpoint</h3>
            <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="font-semibold text-green-600 dark:text-green-400 px-2 py-1 bg-green-100 dark:bg-green-900/50 rounded-md text-sm">POST</span>
                <code className="text-slate-700 dark:text-slate-300">/api/convert</code>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Request Body</h3>
            <p className="mb-2">
                The request body must be a JSON object containing a single key, <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">images</code>, which is an array of base64-encoded JPEG data URI strings.
            </p>
            <CodeBlock language="json" code={jsonExample} />

            <h3 className="mt-6 text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Example with cURL</h3>
            <p className="mb-2">
                Here's how you can call the API from your terminal using cURL to convert an image and save the output as <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">result.pdf</code>.
            </p>
            <CodeBlock language="bash" code={curlExample} />
            
            <h3 className="mt-6 text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Response</h3>
            <p>
                On a successful request, the API will respond with a status code of <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">200 OK</code> and the response body will contain the binary data of the generated PDF document. The <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">Content-Type</code> header will be <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">application/pdf</code>.
            </p>
        </div>
    );
};