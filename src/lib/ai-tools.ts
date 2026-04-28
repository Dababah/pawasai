import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import { getEmbeddings } from './gemini';

// Initialize a service role client for AI operations if needed, 
// but for now we'll assume the user's connection or a general helper.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const aiTools = {
  createNote: {
    description: 'Create a new research note or protocol in the workspace.',
    parameters: z.object({
      title: z.string().describe('The title of the note'),
      content: z.string().describe('The markdown content of the note'),
      category: z.enum(['tech', 'trading', 'business', 'academic', 'general']).describe('Category of the note'),
    }),
    execute: async ({ title, content, category }: any) => {
      console.log(`AI creating note with embeddings: ${title}`);
      
      // Generate embeddings for semantic search
      const embedding = await getEmbeddings(`${title}\n${content}`);
      
      const { data, error } = await supabase
        .from('notes')
        .insert([{ 
          title, 
          content_text: content, 
          category,
          embedding 
        }])
        .select();
      
      if (error) throw error;
      return { success: true, note: data[0], message: `Note "${title}" created successfully with semantic index.` };
    },
  },
  
  logTrade: {
    description: 'Log a new trading execution for XAUUSD or BTCUSD.',
    parameters: z.object({
      pair: z.string().describe('The trading pair (e.g., XAUUSD)'),
      type: z.enum(['Buy', 'Sell']).describe('Trade type'),
      entry: z.number().describe('Entry price'),
      exit: z.number().optional().describe('Exit price'),
      profit: z.number().optional().describe('Profit or Loss amount'),
      notes: z.string().optional().describe('Analysis or notes about the trade'),
    }),
    execute: async ({ pair, type, entry, exit, profit, notes }: any) => {
      console.log(`AI logging trade: ${pair} ${type}`);
      const { data, error } = await supabase
        .from('trading_logs')
        .insert([{ 
          pair, 
          type, 
          entry_price: entry, 
          exit_price: exit, 
          profit_loss: profit,
          notes,
          status: exit ? 'Closed' : 'Open'
        }])
        .select();
      
      if (error) throw error;
      return { success: true, trade: data[0], message: `Trade for ${pair} logged successfully.` };
    },
  },

  updateInventory: {
    description: 'Update gadget inventory for Core Pawas business.',
    parameters: z.object({
      name: z.string().describe('Name of the gadget'),
      action: z.enum(['add', 'remove', 'sold', 'update_price']).describe('Inventory action'),
      quantity: z.number().optional().describe('Quantity changed'),
      price: z.number().optional().describe('New price for the gadget'),
    }),
    execute: async ({ name, action, quantity, price }: any) => {
      console.log(`AI updating inventory: ${name} (${action})`);
      
      // First, find the item
      const { data: items } = await supabase
        .from('inventory')
        .select('*')
        .ilike('name', `%${name}%`);
      
      if (!items || items.length === 0) {
        // If not found and it's 'add', create new
        if (action === 'add') {
          const { data, error } = await supabase
            .from('inventory')
            .insert([{ name, stock: quantity || 0, price: price || 0 }])
            .select();
          if (error) throw error;
          return { success: true, item: data[0], message: `New item ${name} added to inventory.` };
        }
        return { success: false, message: `Item ${name} not found in inventory.` };
      }

      const item = items[0];
      let newStock = item.stock;
      let newPrice = item.price;

      if (action === 'add') newStock += (quantity || 0);
      if (action === 'remove' || action === 'sold') newStock -= (quantity || 0);
      if (price) newPrice = price;

      const { data, error } = await supabase
        .from('inventory')
        .update({ stock: newStock, price: newPrice })
        .eq('id', item.id)
        .select();
      
      if (error) throw error;
      return { success: true, item: data[0], message: `Inventory for ${item.name} updated: Stock=${newStock}, Price=${newPrice}.` };
    },
  },

  navigateApp: {
    description: 'Navigate the user interface to different sections (Dashboard, Trading, Notes, Inventory).',
    parameters: z.object({
      destination: z.string().describe('The destination path or section name (e.g., "trading", "notes", "inventory")'),
    }),
    execute: async ({ destination }: any) => {
      return { success: true, destination, message: `Navigating to ${destination}...` };
    },
  },

  vectorSearch: {
    description: 'Search through the user\'s knowledge base and notes using semantic search.',
    parameters: z.object({
      query: z.string().describe('The search query'),
    }),
    execute: async ({ query }: any) => {
      console.log(`Performing real vector search for: ${query}`);
      
      // Generate embedding for the query
      const queryEmbedding = await getEmbeddings(query);
      if (!queryEmbedding) {
        return { success: false, message: "Failed to generate search embedding." };
      }

      // Call the match_notes function in Supabase
      const { data, error } = await supabase.rpc('match_notes', {
        query_embedding: queryEmbedding,
        match_threshold: 0.5,
        match_count: 5
      });
      
      if (error) throw error;
      return { 
        success: true, 
        results: data, 
        message: `Neural Core found ${data.length} semantically relevant entries for your query.` 
      };
    },
  }
};
