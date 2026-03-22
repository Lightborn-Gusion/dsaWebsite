package com.example.dsawebsite;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyController {

    @GetMapping("/")
    public String home() {
        return "landing";
    }
    @GetMapping("/dashboard")
    public String dashboard() {
        return "index";
    }
    @GetMapping("/array")
    public String arrayPage() {
        return "structures/array";
    }
    @GetMapping("/list")
    public String listPage() {
        return "structures/list";
    }
    @GetMapping("/matrix")
    public String matrixPage() {
        return "structures/matrix";
    }
    @GetMapping("/singly")
    public String singlyPage() {
        return "structures/singly";
    }
    @GetMapping("/doubly")
    public String doublyPage() {
        return "structures/doubly";
    }
    @GetMapping("/circular-singly")
    public String circularSinglyPage() {
        return "structures/circular-singly";
    }
    @GetMapping("/circular-doubly")
    public String circularDoublyPage() {
        return "structures/circular-doubly";
    }
    @GetMapping("/queue")
    public String queuePage() {
        return "structures/queue";
    }
    @GetMapping("/stack")
    public String stackPage() {
        return "structures/stack";
    }
    @GetMapping("/maps")
    public String mapsPage() {
        return "structures/maps";
    }
    @GetMapping("/dictionaries")
    public String dictionariesPage() {
        return "structures/dictionaries";
    }
    @GetMapping("/tuples")
    public String tuplesPage() {
        return "structures/tuples";
    }
    @GetMapping("/trees")
    public String treesPage() {
        return "structures/trees";
    }
    @GetMapping("/graph")
    public String graphPage() {
        return "structures/graph";
    }
    @GetMapping("/heap")
    public String heapPage() {
        return "structures/heap";
    }
    @GetMapping("/hash-table")
    public String hashTablePage() {
        return "structures/hash-table";
    }
    @GetMapping("/bubble-sort")
    public String bubbleSortPage() {
        return "algorithms/bubble-sort";
    }
    @GetMapping("/selection-sort")
    public String selectionSortPage() {
        return "algorithms/selection-sort";
    }
    @GetMapping("/insertion-sort")
    public String insertionSortPage() {
        return "algorithms/insertion-sort";
    }
    @GetMapping("/linear-search")
    public String linearSearchPage() {
        return "algorithms/linear-search";
    }
    @GetMapping("/binary-search")
    public String binarySearchPage() {
        return "algorithms/binary-search";
    }
}