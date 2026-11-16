import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const FEEDS_FILE = path.join(process.cwd(), "src", "data", "feeds.json");

function getFeeds(): any[] {
  try {
    if (!fs.existsSync(FEEDS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(FEEDS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading feeds.json:", err);
    return [];
  }
}

function saveFeeds(feeds: any[]) {
  const dir = path.dirname(FEEDS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(FEEDS_FILE, JSON.stringify(feeds, null, 2), "utf-8");
}

export async function GET() {
  const feeds = getFeeds();
  return NextResponse.json(feeds);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const feeds = getFeeds();

    const maxId = feeds.reduce((max, f) => (f.id > max ? f.id : max), 0);
    const newId = maxId + 1;

    const newPost = {
      id: newId,
      title: body.title || "Untitled",
      date: body.date || new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
      langs: Array.isArray(body.langs) && body.langs.length > 0 ? body.langs : ["EN", "ID"],
      image: body.image || null,
      soundcloud: body.soundcloud || null,
      body: body.body || null,
      quote: body.quote || null,
    };

    feeds.unshift(newPost);
    saveFeeds(feeds);

    return NextResponse.json({ success: true, post: newPost }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating feed post:", error);
    return NextResponse.json({ error: error.message || "Failed to create post" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const feeds = getFeeds();

    const index = feeds.findIndex((f) => f.id === Number(body.id));
    if (index === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    feeds[index] = {
      ...feeds[index],
      title: body.title !== undefined ? body.title : feeds[index].title,
      date: body.date !== undefined ? body.date : feeds[index].date,
      langs: body.langs !== undefined ? body.langs : feeds[index].langs,
      image: body.image !== undefined ? body.image : feeds[index].image,
      soundcloud: body.soundcloud !== undefined ? body.soundcloud : feeds[index].soundcloud,
      body: body.body !== undefined ? body.body : feeds[index].body,
      quote: body.quote !== undefined ? body.quote : feeds[index].quote,
    };

    saveFeeds(feeds);
    return NextResponse.json({ success: true, post: feeds[index] });
  } catch (error: any) {
    console.error("Error updating feed post:", error);
    return NextResponse.json({ error: error.message || "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
    }

    const feeds = getFeeds();
    const filtered = feeds.filter((f) => f.id !== Number(id));

    if (filtered.length === feeds.length) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    saveFeeds(filtered);
    return NextResponse.json({ success: true, message: "Post deleted" });
  } catch (error: any) {
    console.error("Error deleting feed post:", error);
    return NextResponse.json({ error: error.message || "Failed to delete post" }, { status: 500 });
  }
}

