package com.antonybresolin.backend.infrastructure.repositories;

import com.antonybresolin.backend.domain.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface DocumentRepository extends JpaRepository<Document, UUID> {
    List<Document> getDocumentsByContract_Id(UUID contractId);
    List<Document> getDocumentsByContract_IdAndAuthenticatedIsTrue(UUID contractId);
}
