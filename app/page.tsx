import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TickerCards from "./components/TickerCards";
import SentimentPanel from "./components/SentimentPanel";
import PostsList from "./components/PostsList";

export default function Home() {
  return (
    <main>
      <Header />
      <SearchBar />
      <TickerCards />
      <SentimentPanel />
      <PostsList />
    </main>
  );
}