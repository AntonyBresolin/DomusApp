package com.antonybresolin.backend.application;

import com.antonybresolin.backend.domain.model.Document;
import com.antonybresolin.backend.infrastructure.repositories.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DocumentService {
    private final DocumentRepository documentRepository;

    @Autowired
    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public ResponseEntity<Void> generateContractPDF(Document document) {
        documentRepository.save(document);
        return ResponseEntity.status(201).build();
    }

    public List<Document> getContracts(String id) {
        return documentRepository.getDocumentsByContract_Id(UUID.fromString(id));
    }

    public List<Document> getContractsAuthenticated(String id) {
        return documentRepository.getDocumentsByContract_IdAndAuthenticatedIsTrue(UUID.fromString(id));
    }

}
