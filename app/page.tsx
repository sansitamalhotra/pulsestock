import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TickerCards from "./TickerCards";
import SentimentPanel from "./components/SentimentPanel";

export default function Home() {
  return (
    <main>
      <Header />
      <SearchBar />
      <TickerCards />
      <SentimentPanel />
    </main>
  );
}