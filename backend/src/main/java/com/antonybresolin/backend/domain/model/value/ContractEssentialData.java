package com.antonybresolin.backend.domain.model.value;

import jakarta.persistence.Embeddable;

@Embeddable
public class ContractEssentialData {
    private CivilStatus civilStatus;
    private String occupation;
}
