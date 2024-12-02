import XCTest
import SwiftTreeSitter
import TreeSitterHorn

final class TreeSitterHornTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_horn())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Horn grammar")
    }
}
