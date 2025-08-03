package com.antonybresolin.backend.presentation;

import com.antonybresolin.backend.application.DocumentService;
import com.antonybresolin.backend.domain.model.Document;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/documents")
public class DocumentController {
    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping("/generate")
    private ResponseEntity<Void> generateContract(@RequestBody final Document document) {
        return documentService.generateContractPDF(document);
    }

    @GetMapping("/{id}")
    private List<Document> getDocumentsByContractId(@PathVariable final String id) {
        return documentService.getContracts(id);
    }

    @GetMapping("/{id}/authenticated")
    private List<Document> getDocumentsAuthenticatedByContract(@PathVariable final String id) {
        return documentService.getContractsAuthenticated(id);
    }
}
