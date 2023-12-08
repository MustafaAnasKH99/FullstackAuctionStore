import { createClient } from "@supabase/supabase-js";
import {expect, jest, test} from '@jest/globals';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

test('Test Payment database functionality in retrieving existing data', async () => {
    const { data, error, status } = await supabase.from('payments').select(`*`)
    expect(data[0].credit_card_number).toBe('1111222233334444')
    expect(data[1].credit_card_number).toBe('1111222233334444')

    expect(data[0].card_name).toBe('Mustafa A')
    expect(data[1].card_name).toBe('Tester User')

    expect(data[0].card_expiry).toBe('11/11')
    expect(data[1].card_expiry).toBe('11/11')

    expect(data[0].card_code).toBe('123')
    expect(data[1].card_code).toBe('123')
})

test('Test Payment database functionality in retrieving existing data', async () => {
    const { data, error, status } = await supabase.from('payments').select().eq("card_name", 'Mustafa A')
    expect(data[0].credit_card_number).toBe('1111222233334444')
    expect(data[0].card_name).toBe('Mustafa A')
    expect(data[0].card_expiry).toBe('11/11')
    expect(data[0].card_code).toBe('123')
})

test('Test Payment database functionality in retrieving existing data', async () => {
    const { data, error, status } = await supabase.from('payments').select().eq("card_name", 'Tester User')
    expect(data[0].credit_card_number).toBe('1111222233334444')
    expect(data[0].card_name).toBe('Tester User')
    expect(data[0].card_expiry).toBe('11/11')
    expect(data[0].card_code).toBe('123')
})
