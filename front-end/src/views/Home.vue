<template>
<div class="home">
  <section class="image-gallery">
    <div class="image" v-for="item in items" :key="item.id">
      <h2>{{item.title}}</h2>
      <p>Votes: {{item.upvotes}}</p>
      <img :src="item.path" />
      <p>{{item.text}}</p>
      <p>{{item.instructions}}</p>
      <p>{{item.ingredients}}</p>

      <button @click="upvoteItem(item)">Upvote</button>
    </div>
  </section>
</div>
</template>

<style scoped>
.image h2 {
  font-style: italic;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
}

.image {
  margin: 1 1 1.5em;
  display: inline-block;
  width: 100%;
  padding: 5px;
  border: 3px ridge;
}

.image img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>



<script>
// @ is an alias to /src
import axios from 'axios';


export default {
  name: 'Home',
  data() {
    return {
     items: [],
    }
  },
  created() {
    this.getItems();
  },
  computed: {
    upvote(item) {
      return item.upvotes + 1;
    }
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async upvoteItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          title: item.title,
          text: item.text,
          instructions: item.instructions,
          ingredients: item.ingredients,
          upvotes: item.upvotes + 1,
        });
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>
