import { buildSelectionSet } from "../src";

interface Category {
  id: string;
  name: string;
}

interface Segment {
  id: string;
  name: string;
}

interface Sector {
  id: string;
  name: string;
}

interface Asset {
  id: string;
  name: string;
  value: number;
  category: Category[];
  segment: Segment[];
  sector: Sector[];
}

interface Portfolio {
  id: string;
  name: string
  assets: Asset[]        
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  portfolio: Portfolio[];
}

buildSelectionSet<User>([
  "id",
  "email",
  "name",
  "password",
  {
    portfolio: [
      "id",
      "name",
      {
        assets: [
          "id",
          "name",
          "value",
          {
            category: [
              "id",
              "name"
            ],
            sector: [
              "id",
              "name"
            ],
            segment: [
              "id",
              "name"
            ],
          }
        ]
      }
    ]
  }
])