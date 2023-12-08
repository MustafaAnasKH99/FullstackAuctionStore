import { createClient } from "@supabase/supabase-js";
import {expect, jest, test} from '@jest/globals';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

test('Test user database functionality in retrieving existing data', async () => {
    const { data, error, status } = await supabase.from('profiles').select().eq("username", "johndoe")
    expect(data[0].username).toBe('johndoe')
    expect(data[0].full_name).toBe('John Doe')
    expect(data[0].avatar_url).toBe(null)
    expect(data[0].website).toBe('yorku.com')
    expect(data[0].first_name).toBe('John')
    expect(data[0].last_name).toBe('Doe')
    expect(data[0].street_address).toBe('20 Keele camp')
    expect(data[0].province).toBe('ON')
    expect(data[0].country).toBe('Canada')
    expect(data[0].postal_code).toBe('M2D 1B4')
    expect(data[0].phone_number).toBe(null)
})
test('Test user database functionality in retrieving existing data', async () => {
    const { data, error, status } = await supabase.from('profiles').select().eq("username", "TestUsername")
    expect(data[0].username).toBe('TestUsername')
    expect(data[0].full_name).toBe('Tester Account')
    expect(data[0].avatar_url).toBe(null)
    expect(data[0].website).toBe('www.google.com')
    expect(data[0].first_name).toBe('Testing User')
    expect(data[0].last_name).toBe("Tester's Lastname")
    expect(data[0].street_address).toBe('North york')
    expect(data[0].province).toBe('ON')
    expect(data[0].country).toBe('Canada')
    expect(data[0].postal_code).toBe('M3C')
    expect(data[0].phone_number).toBe('1234567891')
})
test('Test user database functionality in retrieving existing data', async () => {
    const { data, error, status } = await supabase.from('profiles').select().eq("username", "testuser")
    expect(data[0].username).toBe('testuser')
    expect(data[0].full_name).toBe('test')
    expect(data[0].avatar_url).toBe(null)
    expect(data[0].website).toBe('test1234')
    expect(data[0].first_name).toBe('fname')
    expect(data[0].last_name).toBe('lname23')
    expect(data[0].street_address).toBe('123 street')
    expect(data[0].province).toBe('Ontario')
    expect(data[0].country).toBe('Canada')
    expect(data[0].postal_code).toBe('X1X 1X1')
    expect(data[0].phone_number).toBe('1112223333')
})
