import React, { useState, useEffect } from "react";
import brandsData from "./brands.json";

const DEFAULT_RADIUS = 50; // km
const KRAKOW_COORDS = { lat: 50.0647, lng: 19.9450 };

function buildOtomotoUrl(brand, model, minPrice, maxPrice, minMileage, maxMileage) {
  let url = `https://www.otomoto.pl/osobowe/${brand ? brand.toLowerCase() + '/' : ''}${model ? model.toLowerCase().replace(/\s+/g, '-') + '/' : ''}`;
  url += "?search%5Bregion_id%5D=6"; // 6 = Małopolskie
  url += `&search%5Bdist%5D=${DEFAULT_RADIUS}`;
  url += "&search%5Bcity_id%5D=krakow";
  if (minPrice) url += `&search%5Bfilter_float_price%3Afrom%5D=${minPrice}`;
  if (maxPrice) url += `&search%5Bfilter_float_price%3Ato%5D=${maxPrice}`;
  if (minMileage) url += `&search%5Bfilter_float_mileage%3Afrom%5D=${minMileage}`;
  if (maxMileage) url += `&search%5Bfilter_float_mileage%3Ato%5D=${maxMileage}`;
  return url;
}

function buildOlxUrl(brand, model, minPrice, maxPrice, minMileage, maxMileage) {
  let url = "https://www.olx.pl/motoryzacja/samochody/";
  if (brand) url += brand.toLowerCase() + "/";
  if (model) url += model.toLowerCase().replace(/\s+/g, '-') + "/";
  url += "?search%5Bdist%5D=50";
  url += "&search%5Bcity_id%5D=krakow";
  if (minPrice) url += `&search%5Bfilter_float_price:from%5D=${minPrice}`;
  if (maxPrice) url += `&search%5Bfilter_float_price:to%5D=${maxPrice}`;
  if (minMileage) url += `&search%5Bfilter_float_mileage:from%5D=${minMileage}`;
  if (maxMileage) url += `&search%5Bfilter_float_mileage:to%5D=${maxMileage}`;
  return url;
}

function buildFacebookUrl(brand, model, minPrice, maxPrice) {
  // Facebook Marketplace URLs can't be filtered as granularly via URL, but we can provide a search query
  let url = "https://www.facebook.com/marketplace/krakow/search/?query=";
  let query = [];
  if (brand) query.push(brand);
  if (model) query.push(model);
  url += encodeURIComponent(query.join(" "));
  if (minPrice) url += `&minPrice=${minPrice}`;
  if (maxPrice) url += `&maxPrice=${maxPrice}`;
  return url;
}

export default function CarSearch() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [models, setModels] = useState([]);
  const [minMileage, setMinMileage] = useState(0);
  const [maxMileage, setMaxMileage] = useState(300000);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000);

  useEffect(() => {
    setModels(brand ? brandsData[brand] : []);
    setModel("");
  }, [brand]);

  const handleSearch = () => {
    const otoUrl = buildOtomotoUrl(brand, model, minPrice, maxPrice, minMileage, maxMileage);
    const olxUrl = buildOlxUrl(brand, model, minPrice, maxPrice, minMileage, maxMileage);
    const fbUrl = buildFacebookUrl(brand, model, minPrice, maxPrice);
    window.open(otoUrl, "_blank");
    window.open(olxUrl, "_blank");
    window.open(fbUrl, "_blank");
  };

  return (
    <div className="car-search" style={{maxWidth: 500, margin: "0 auto", padding: 20}}>
      <h2>Znajdź używane auto w promieniu 50 km od Krakowa</h2>
      <label>
        Marka:
        <select value={brand} onChange={e => setBrand(e.target.value)}>
          <option value="">-- wybierz --</option>
          {Object.keys(brandsData).map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </label>
      <br />
      <label>
        Model:
        <select value={model} onChange={e => setModel(e.target.value)} disabled={!brand}>
          <option value="">-- wybierz --</option>
          {models.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </label>
      <br />
      <label>
        Przebieg: {minMileage} km - {maxMileage} km
        <br />
        <input type="range" min="0" max="300000" step="1000" value={minMileage}
          onChange={e => setMinMileage(Number(e.target.value))}
        />
        <input type="range" min="0" max="300000" step="1000" value={maxMileage}
          onChange={e => setMaxMileage(Number(e.target.value))}
        />
      </label>
      <br />
      <label>
        Cena: {minPrice} zł - {maxPrice} zł
        <br />
        <input type="range" min="0" max="200000" step="1000" value={minPrice}
          onChange={e => setMinPrice(Number(e.target.value))}
        />
        <input type="range" min="0" max="200000" step="1000" value={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
        />
      </label>
      <br />
      <button onClick={handleSearch} style={{marginTop: 20, padding: "10px 30px"}}>Szukaj</button>
      <div style={{fontSize:12,marginTop:20}}>
        Wyniki otworzą się w nowych kartach: Otomoto, OLX, Facebook Marketplace.
      </div>
    </div>
  );
}