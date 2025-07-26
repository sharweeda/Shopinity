export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 shadow-inner mt-10">
      <div className="w-full max-w-screen-xl mx-auto p-4 flex justify-center items-center text-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <a href="/" className="hover:underline font-semibold text-blue-600 dark:text-blue-400">
            Shopinity
          </a>. All Rights Reserved. Built with ❤️ by{" "}
          <span className="font-semibold text-gray-800 dark:text-white">sharWeeDa</span>.
        </span>
      </div>
    </footer>
  );
}
