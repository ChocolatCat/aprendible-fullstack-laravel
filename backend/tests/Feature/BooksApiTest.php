<?php

namespace Tests\Feature;

use App\Models\Book;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BooksApiTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */

    use RefreshDatabase;

    //We add this to enable tests. Else we need the test prefix on any test
    /** @test */
    function can_get_all_books(){
        $books = Book::factory(4)->create();
        
        $this->getJson(route('books.index'))->assertJsonFragment([
            'title' => $books[0]->title
        ])->assertJsonFragment([
            'title' => $books[1]->title
        ]);
    }

    /** @test */
    function can_get_one_book(){
        $book = Book::factory()->create();
        
        $this->getJson(route('books.show', $book))->assertJsonFragment([
            'title' => $book->title
        ]);
    }

    /** @test */
    function can_create_book(){
        //Regression test
        $this->postJson(route('books.store'), [])
        ->assertJsonValidationErrorFor('title');

        $this->postJson(route('books.store'), [
            'title' => 'New book'
        ])->assertJsonFragment([
            'title' => 'New book'
        ]);
        $this->assertDatabaseHas('books', [
            'title' => 'New book'
        ]);
    }

    /** @test */
    function can_update_book(){
        $book = Book::factory()->create();

        //Regression test
        $this->patchJson(route('books.update', $book), [])
        ->assertJsonValidationErrorFor('title');

        $this->patchJson(route('books.update', $book), [
            'title' => 'Edited Book'
        ])->assertJsonFragment([
            'title' => 'Edited Book'
        ]);

        $this->assertDatabaseHas('books', [
            'title' => 'Edited Book'
        ]);
    }

    /** @test */
    function can_delete_book(){
        $book = Book::factory()->create();

        $this->deleteJson(route('books.destroy', $book))->assertNoContent();

        $this->assertDatabaseCount('books', 0);
    }
}
