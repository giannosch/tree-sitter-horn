package tree_sitter_horn_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_horn "github.com/tree-sitter/tree-sitter-horn/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_horn.Language())
	if language == nil {
		t.Errorf("Error loading Horn grammar")
	}
}
