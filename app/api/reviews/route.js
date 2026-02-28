import { NextResponse } from 'next/server';

export async function GET() {
    const PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;
    const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

    if (!PLACE_ID || !API_KEY) {
        return NextResponse.json({ error: 'Missing Google API credentials' }, { status: 500 });
    }

    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,user_ratings_total,reviews&key=${API_KEY}`;

        const response = await fetch(url, {
            next: { revalidate: 86400 }
        });

        const data = await response.json();

        if (data.status === 'OK') {
            const filteredReviews = data.result.reviews
                ?.filter(review => review.rating >= 4)
                .sort((a, b) => b.time - a.time) || [];

            return NextResponse.json({
                rating: data.result.rating,
                totalRatings: data.result.user_ratings_total,
                reviews: filteredReviews
            });
        }

        return NextResponse.json({ error: data.status }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}