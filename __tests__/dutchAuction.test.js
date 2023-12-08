import { createClient } from "@supabase/supabase-js";
import {expect, jest, test} from '@jest/globals';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

test('Test Dutch Auction database functionality in retrieving existing data', async () => {
    const { data, error, status } = await supabase.from('dutch_auction').select(`*`)

    expect(data[0].id).toBe(2);
    expect(data[0].initial_price).toBe(1000);
    expect(data[0].decrement_amount).toBe(50);
    expect(data[0].reserve_price).toBe(700);    
    expect(data[0].published).toBe(true);
    expect(data[0].title).toBe("Saneta's First item");
    expect(data[0].pictures.length).toBe(2);
    expect(data[0].description).toBe("saneta's house");

    expect(data[1].id).toBe(1);
    expect(data[1].initial_price).toBe(15000);
    expect(data[1].decrement_amount).toBe(2000);
    expect(data[1].reserve_price).toBe(7000);    
    expect(data[1].published).toBe(true);
    expect(data[1].title).toBe("published Auction - Publicly viewable");
    expect(data[1].pictures.length).toBe(2);
    expect(data[1].description).toBe(null);

    expect(data[2].id).toBe(9);
    expect(data[2].initial_price).toBe(300);
    expect(data[2].decrement_amount).toBe(30);
    expect(data[2].reserve_price).toBe(50);    
    expect(data[2].published).toBe(true);
    expect(data[2].title).toBe("Wooden Chair");
    expect(data[2].pictures.length).toBe(2);
    expect(data[2].description).toBe("Wooden chair dutch auction");
});

test('Test Dutch Auction database functionality in retrieving existing data filtering by reserve price', async () => {
    const { data, error, status } = await supabase.from('dutch_auction').select().eq("reserve_price",7000)
    expect(data[0].id).toBe(1);
    expect(data[0].initial_price).toBe(15000);
    expect(data[0].decrement_amount).toBe(2000);
    expect(data[0].reserve_price).toBe(7000);    
    expect(data[0].published).toBe(true);
    expect(data[0].title).toBe("published Auction - Publicly viewable");
    expect(data[0].pictures.length).toBe(2);
    expect(data[0].description).toBe(null);
});

test('Test Dutch Auction database functionality in retrieving existing data filtering by decrement amount', async () => {
    const { data, error, status } = await supabase.from('dutch_auction').select().eq("decrement_amount",2000)
    expect(data[0].id).toBe(1);
    expect(data[0].initial_price).toBe(15000);
    expect(data[0].decrement_amount).toBe(2000);
    expect(data[0].reserve_price).toBe(7000);    
    expect(data[0].published).toBe(true);
    expect(data[0].title).toBe("published Auction - Publicly viewable");
    expect(data[0].pictures.length).toBe(2);
    expect(data[0].description).toBe(null);
});

test('Test Dutch Auction database functionality in retrieving existing data filtering by initial price', async () => {
    const { data, error, status } = await supabase.from('dutch_auction').select().eq("initial_price",15000)
    expect(data[0].id).toBe(1);
    expect(data[0].initial_price).toBe(15000);
    expect(data[0].decrement_amount).toBe(2000);
    expect(data[0].reserve_price).toBe(7000);    
    expect(data[0].published).toBe(true);
    expect(data[0].title).toBe("published Auction - Publicly viewable");
    expect(data[0].pictures.length).toBe(2);
    expect(data[0].description).toBe(null);
});

test('Test Dutch Auction database functionality in retrieving existing data filtering by title', async () => {
    const { data, error, status } = await supabase.from('dutch_auction').select().eq("title","published Auction - Publicly viewable")
    expect(data[0].id).toBe(1);
    expect(data[0].initial_price).toBe(15000);
    expect(data[0].decrement_amount).toBe(2000);
    expect(data[0].reserve_price).toBe(7000);    
    expect(data[0].published).toBe(true);
    expect(data[0].title).toBe("published Auction - Publicly viewable");
    expect(data[0].pictures.length).toBe(2);
    expect(data[0].description).toBe(null);
});


test('Test Dutch Auction database functionality in retrieving existing data filtering by reserve price', async () => {
    const { data, error, status } = await supabase.from('dutch_auction').select().eq("reserve_price",700)
    expect(data[0].id).toBe(2);
    expect(data[0].initial_price).toBe(1000);
    expect(data[0].decrement_amount).toBe(50);
    expect(data[0].reserve_price).toBe(700);    
    expect(data[0].published).toBe(true);
    expect(data[0].title).toBe("Saneta's First item");
    expect(data[0].pictures.length).toBe(2);
    expect(data[0].description).toBe("saneta's house");

});

test('Test Dutch Auction database functionality in retrieving existing data filtering by decrement amount', async () => {
    const { data, error, status } = await supabase.from('dutch_auction').select().eq("decrement_amount",50)
    expect(data[0].id).toBe(2);
    expect(data[0].initial_price).toBe(1000);
    expect(data[0].decrement_amount).toBe(50);
    expect(data[0].reserve_price).toBe(700);    
    expect(data[0].published).toBe(true);
    expect(data[0].title).toBe("Saneta's First item");
    expect(data[0].pictures.length).toBe(2);
    expect(data[0].description).toBe("saneta's house");

});

test('Test Dutch Auction database functionality in retrieving existing data filtering by initial price', async () => {
    const { data, error, status } = await supabase.from('dutch_auction').select().eq("initial_price",1000)
    expect(data[0].id).toBe(2);
    expect(data[0].initial_price).toBe(1000);
    expect(data[0].decrement_amount).toBe(50);
    expect(data[0].reserve_price).toBe(700);    
    expect(data[0].published).toBe(true);
    expect(data[0].title).toBe("Saneta's First item");
    expect(data[0].pictures.length).toBe(2);
    expect(data[0].description).toBe("saneta's house");

});


test('Test Dutch Auction database functionality in retrieving existing data filtering by reserve price', async () => {
    const { data, error, status } = await supabase.from('dutch_auction').select().eq("reserve_price",50)
    expect(data[0].id).toBe(9);
    expect(data[0].initial_price).toBe(300);
    expect(data[0].decrement_amount).toBe(30);
    expect(data[0].reserve_price).toBe(50);    
    expect(data[0].published).toBe(true);
    expect(data[0].title).toBe("Wooden Chair");
    expect(data[0].pictures.length).toBe(2);
    expect(data[0].description).toBe("Wooden chair dutch auction");
});

test('Test Dutch Auction database functionality in retrieving existing data filtering by decrement amount', async () => {
    const { data, error, status } = await supabase.from('dutch_auction').select().eq("decrement_amount",30)
    expect(data[0].id).toBe(9);
    expect(data[0].initial_price).toBe(300);
    expect(data[0].decrement_amount).toBe(30);
    expect(data[0].reserve_price).toBe(50);    
    expect(data[0].published).toBe(true);
    expect(data[0].title).toBe("Wooden Chair");
    expect(data[0].pictures.length).toBe(2);
    expect(data[0].description).toBe("Wooden chair dutch auction");
});

test('Test Dutch Auction database functionality in retrieving existing data filtering by initial price', async () => {
    const { data, error, status } = await supabase.from('dutch_auction').select().eq("initial_price",300)
    expect(data[0].id).toBe(9);
    expect(data[0].initial_price).toBe(300);
    expect(data[0].decrement_amount).toBe(30);
    expect(data[0].reserve_price).toBe(50);    
    expect(data[0].published).toBe(true);
    expect(data[0].title).toBe("Wooden Chair");
    expect(data[0].pictures.length).toBe(2);
    expect(data[0].description).toBe("Wooden chair dutch auction");
});

test('Test Dutch Auction database functionality in retrieving existing data filtering by title', async () => {
    const { data, error, status } = await supabase.from('dutch_auction').select().eq("title","Wooden Chair")
    expect(data[0].id).toBe(9);
    expect(data[0].initial_price).toBe(300);
    expect(data[0].decrement_amount).toBe(30);
    expect(data[0].reserve_price).toBe(50);    
    expect(data[0].published).toBe(true);
    expect(data[0].title).toBe("Wooden Chair");
    expect(data[0].pictures.length).toBe(2);
    expect(data[0].description).toBe("Wooden chair dutch auction");
});
