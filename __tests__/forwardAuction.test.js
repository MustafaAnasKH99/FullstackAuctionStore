import { createClient } from "@supabase/supabase-js";
import {expect, jest, test} from '@jest/globals';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

test('Test Forward Auction database functionality in retrieving existing data', async () => {
    const { data, error, status } = await supabase.from('forward_auction').select(`*`)
    expect(data.length).toBe(5)
})
test('Test Forward Auction database functionality in retrieving existing data', async () => {
    const { data, error, status } = await supabase.from('forward_auction').select().eq("base_price", 1500)
    expect(data[0].title).toBe("Mustafa's First Auction")
    expect(data[0].pictures.length).toBe(2)
    expect(data[0].description).toBe('Testing listing an unpublished item')
})
test('Test Dutch Auction database functionality in retrieving existing data', async () => {
    const { data, error, status } = await supabase.from('forward_auction').select().eq("base_price", 30000)
    expect(data[0].title).toBe('Red Car')
    expect(data[0].pictures.length).toBe(4)
    expect(data[0].description).toBe('new Red car for Auciton. Best price only.')

})
test('Test Dutch Auction database functionality in retrieving existing data', async () => {
    const { data, error, status } = await supabase.from('forward_auction').select().eq("base_price", 1000)
    expect(data[0].title).toBe('Testing Published Forward auction')
    expect(data[0].pictures.length).toBe(2)
    expect(data[0].description).toBe('test search by typing search ')

})
test('Test Dutch Auction database functionality in retrieving existing data', async () => {
    const { data, error, status } = await supabase.from('forward_auction').select().eq("base_price", 5000)
    expect(data[0].title).toBe("House for Auction")
    expect(data[0].pictures.length).toBe(2)
    expect(data[0].description).toBe('All users should be able to see this auction')

})
test('Test Dutch Auction database functionality in retrieving existing data', async () => {
    const { data, error, status } = await supabase.from('forward_auction').select().eq("base_price", 50)
    expect(data[0].title).toBe("First Auction")
    expect(data[0].pictures.length).toBe(0)
    expect(data[0].description).toBe('Test')
})
